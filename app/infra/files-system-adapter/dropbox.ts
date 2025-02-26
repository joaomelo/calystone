import type { DirectoryDataOptions, Id } from "@/domain";
import type { ArtifactOrDirectoryDataOptions } from "@/services";

import { createId } from "@/domain";
import { throwCritical, throwError } from "@/utils";
import { Dropbox } from "dropbox";

import { BaseFileSystemAdapter } from "./base";

export class DropboxFileSystemAdapter extends BaseFileSystemAdapter<string> {
  dropboxClient: Dropbox;

  constructor(accessToken: string) {
    const rootLowerPath = "";
    const rootData: DirectoryDataOptions = {
      id: createId(),
      name: "Dropbox",
      parentId: undefined
    };
    super({ rootData, rootMetadata: rootLowerPath });
    this.dropboxClient = new Dropbox({ accessToken });
  }

  async fetchFileContent(id: Id): Promise<ArrayBuffer> {
    const path = this.metadataOrThrow(id);
    const response = await this.dropboxClient.filesDownload({ path });

    if (!("fileBlob" in response.result) || !(response.result.fileBlob instanceof Blob)) {
      throwError("DROPBOX_NO_BLOB", `No blob was returned when downloading '${id}'`);
    }

    const content = await response.result.fileBlob.arrayBuffer();
    return content;
  }

  async openDirectory(id: Id): Promise<ArtifactOrDirectoryDataOptions[]> {
    const path = this.metadataOrThrow(id);
    const result = await this.dropboxClient.filesListFolder({ path });

    const childrenData: ArtifactOrDirectoryDataOptions[] = [];

    for (const childResult of result.result.entries) {
      if (typeof childResult.path_lower !== "string") {
        throwError("DROPBOX_UNMOUNTED_NODE", "cannot open dropbox directory with nodes that do not have a path");
      }
      const kind = childResult[".tag"];
      if (kind === "deleted") continue;

      const childId = createId();

      let childData: ArtifactOrDirectoryDataOptions = {
        id: childId,
        name: childResult.name,
        parentId: id,
      };

      if (kind === "file") {
        const size = childResult.size;
        const lastModified = childResult.server_modified
          ? new Date(childResult.server_modified).getTime()
          : Date.now();

        childData = {
          ...childData,
          lastModified,
          size,
        };
      }

      this.nodesMetadata.set(childId, childResult.path_lower);
      childrenData.push(childData);
    };
    return childrenData;
  }

  async postFileContent({ content, id }: { content: ArrayBuffer; id: Id, }): Promise<void> {
    const path = this.metadataOrThrow(id);
    await this.dropboxClient.filesUpload({
      contents: content,
      mode: { ".tag": "overwrite" },
      path
    });
  }

  renameDirectory(): Promise<void> {
    throwCritical("NOT_IMPLEMENTED", "method not implemented");
  }

  renameFile(): Promise<void> {
    throwCritical("NOT_IMPLEMENTED", "method not implemented");
  }
}
