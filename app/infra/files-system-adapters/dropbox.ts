import type { ArtifactDataOptions, DirectoryDataOptions, Id, Node } from "@/domain";
import type { Directory } from "@/domain";

import { createId } from "@/domain";
import { throwCritical, throwError } from "@/utils";
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

  async createArtifact(options: { name: string, parent: Directory }): Promise<ArtifactDataOptions> {
    const { name, parent: { id: parentId } } = options;

    const parentPath = this.metadataOrThrow(parentId);
    const newPath = `${parentPath}/${name}`;

    await this.dropboxClient.filesUpload({
      contents: "",
      mode: { ".tag": "add" },
      path: newPath
    });

    const id = createId();
    this.nodesMetadata.set(id, newPath);

    const data: ArtifactDataOptions = {
      id,
      lastModified: Date.now(),
      name,
      parentId,
      size: 0
    };

    return data;
  }

  async createDirectory(options: { name: string, parent: Directory }): Promise<DirectoryDataOptions> {
    const { name, parent: { id: parentId } } = options;

    const parentPath = this.metadataOrThrow(parentId);
    const newPath = `${parentPath}/${name}`;
    await this.dropboxClient.filesCreateFolderV2({
      autorename: false,
      path: newPath
    });

    const id = createId();
    this.nodesMetadata.set(id, newPath);

    const newDirectoryData: DirectoryDataOptions = { id, name, parentId };
    return newDirectoryData;
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

  async moveNode(options: { subject: Node, target: Node }): Promise<void> {
    const { subject, target } = options;

    const able = subject.moveable(target);
    able.throwOnFail();

    const oldPath = this.metadataOrThrow(subject.id);
    const targetPath = this.metadataOrThrow(target.id);
    const newPath = `${targetPath}/${subject.name}`;

    await this.dropboxClient.filesMoveV2({
      autorename: false,
      from_path: oldPath,
      to_path: newPath
    });

    this.nodesMetadata.set(subject.id, newPath);
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

  async removeNode(node: Node): Promise<void> {
    if (node.isRoot()) {
      throwCritical("CANNOT_REMOVE_ROOT", "cannot remove the root node");
    }
    const path = this.metadataOrThrow(node.id);
    await this.dropboxClient.filesDeleteV2({ path });
    this.removeMetadata(node);
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
