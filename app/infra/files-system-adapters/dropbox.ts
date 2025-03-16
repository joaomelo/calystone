import type { DirectoryDataOptions, Id } from "@/domain";

import { createId } from "@/domain";
import { throwError } from "@/utils";
import { Dropbox } from "dropbox";

import type { ArtifactOrDirectoryDataOptions } from "./file-system";

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

  async renameDirectory(options: { id: Id, name: string }): Promise<void> {
    await this.renameNode(options);
  }

  async renameFile(options: { id: Id, name: string }): Promise<void> {
    await this.renameNode(options);
  }

  async renameNode(options: { id: Id, name: string }): Promise<void> {
    const { id, name } = options;

    const oldPath = this.metadataOrThrow(id);
    if (oldPath === this.rootMetadata) throwError("DROPBOX_RENAME_ROOT", "cannot rename dropbox root node");

    const parentPath = oldPath.substring(0, oldPath.lastIndexOf("/"));
    const newPath = `${parentPath}/${name}`;

    await this.dropboxClient.filesMoveV2({
      autorename: false,
      from_path: oldPath,
      to_path: newPath
    });

    this.nodesMetadata.set(id, newPath);
  }
}
