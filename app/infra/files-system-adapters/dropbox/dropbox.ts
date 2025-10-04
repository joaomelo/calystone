import { Dropbox } from "dropbox";

import type {
  ArtifactOptions,
  Directory,
  DirectoryOptions,
  Node,
  Nodes
} from "@/domain";

import {
  Artifact,
  createId
} from "@/domain";
import { throwError } from "@/utils";

import type { ArtifactOrDirectoryOptions } from "../file-system";

import { BaseFileSystemAdapter } from "../base";

export class DropboxFileSystemAdapter extends BaseFileSystemAdapter<string, string> {
  dropboxClient: Dropbox;

  constructor({
    accessToken,
    nodes
  }: {
    accessToken: string;
    nodes: Nodes;
  }) {
    const rootLowerPath = "";
    const rootOptions: DirectoryOptions = {
      id: createId(),
      name: "Dropbox",
      parentId: undefined
    };
    super({
      nodes,
      rootMetadata: rootLowerPath,
      rootOptions
    });
    this.dropboxClient = new Dropbox({ accessToken });
  }

  async createArtifact({
    name,
    parent
  }: {
    name: string,
    parent: Directory
  }): Promise<ArtifactOptions> {
    const { id: parentId } = parent;

    const container = this.metadatas.getOfDirectoryOrThrow(parentId);
    const { metadata: parentPath } = container;
    const newPath = `${parentPath}/${name}`;

    await this.dropboxClient.filesUpload({
      contents: "",
      mode: { ".tag": "add" },
      path: newPath
    });

    const id = createId();
    this.metadatas.setFile({
      id,
      metadata: newPath
    });
    const data: ArtifactOptions = {
      id,
      lastModified: Date.now(),
      name,
      parentId,
      size: 0
    };
    return data;
  }

  async createDirectory(options: {
    name: string,
    parent: Directory
  }): Promise<DirectoryOptions> {
    const {
      name,
      parent: { id: parentId }
    } = options;

    const { metadata: parentPath } = this.metadatas.getOfDirectoryOrThrow(parentId);
    const newPath = `${parentPath}/${name}`;
    await this.dropboxClient.filesCreateFolderV2({
      autorename: false,
      path: newPath
    });

    const id = createId();
    this.metadatas.setDirectory({
      id,
      metadata: newPath
    });
    const newDirectoryData: DirectoryOptions = {
      id,
      name,
      parentId
    };
    return newDirectoryData;
  }

  async fetchContent(artifact: Artifact): Promise<ArrayBuffer> {
    const { metadata: path } = this.metadatas.getOfFileOrThrow(artifact.id);
    const response = await this.dropboxClient.filesDownload({ path });

    if (!("fileBlob" in response.result) || !(response.result.fileBlob instanceof Blob)) {
      throwError("DROPBOX_NO_BLOB");
    }

    const content = await response.result.fileBlob.arrayBuffer();
    return content;
  }

  async move(options: {
    subject: Node,
    target: Directory
  }): Promise<void> {
    const {
      subject,
      target
    } = options;

    this.moveable(subject).throwOnFail();

    const { metadata: oldPath } = this.metadatas.getOrThrow(subject.id);
    const { metadata: targetPath } = this.metadatas.getOrThrow(target.id);
    const newPath = `${targetPath}/${subject.name}`;

    await this.dropboxClient.filesMoveV2({
      autorename: false,
      from_path: oldPath,
      to_path: newPath
    });

    if (subject instanceof Artifact) {
      this.metadatas.setFile({
        id: subject.id,
        metadata: newPath
      });
    } else {
      this.metadatas.setDirectory({
        id: subject.id,
        metadata: newPath
      });
    }
  }

  moveable(subject: Node) {
    return this.failIfRoot(subject);
  }

  async open(parent: Directory): Promise<ArtifactOrDirectoryOptions[]> {
    const { id: parentId } = parent;
    const { metadata: path } = this.metadatas.getOfDirectoryOrThrow(parentId);
    const result = await this.dropboxClient.filesListFolder({ path });

    const childrenData: ArtifactOrDirectoryOptions[] = [];

    for (const childResult of result.result.entries) {
      if (typeof childResult.path_lower !== "string") {
        throwError("DROPBOX_UNMOUNTED_NODE", "cannot open dropbox directory with nodes that do not have a path");
      }
      const kind = childResult[".tag"];
      if (kind === "deleted") continue;

      const childId = createId();

      if (kind === "folder") {
        const childData: DirectoryOptions = {
          id: childId,
          name: childResult.name,
          parentId,
        };
        this.metadatas.setDirectory({
          id: childId,
          metadata: childResult.path_lower
        });
        childrenData.push(childData);
        continue;
      }

      const { size } = childResult;
      const lastModified = childResult.server_modified
        ? new Date(childResult.server_modified).getTime()
        : Date.now();
      const childData: ArtifactOptions = {
        id: childId,
        lastModified,
        name: childResult.name,
        parentId: parent.id,
        size,
      };
      this.metadatas.setFile({
        id: childId,
        metadata: childResult.path_lower
      });
      childrenData.push(childData);
    };

    return childrenData;
  }

  async postContent(artifact: Artifact): Promise<void> {
    const { metadata: path } = this.metadatas.getOfFileOrThrow(artifact.id);
    await this.dropboxClient.filesUpload({
      contents: artifact.toBinary(),
      mode: { ".tag": "overwrite" },
      path
    });
  }

  async remove(node: Node): Promise<void> {
    const removeable = this.removeable(node);
    removeable.throwOnFail();

    const { metadata: path } = this.metadatas.getOrThrow(node.id);
    await this.dropboxClient.filesDeleteV2({ path });
    this.metadatas.remove(node);
  }

  removeable(node: Node) {
    return this.failIfRoot(node);
  }

  async rename(options: {
    name: string;
    node: Node,
  }): Promise<void> {
    const renameable = this.renameable(options.node);
    renameable.throwOnFail();

    const {
      name,
      node
    } = options;
    const { id } = node;

    const { metadata: oldPath } = this.metadatas.getOrThrow(id);
    const parentPath = oldPath.substring(0, oldPath.lastIndexOf("/"));
    const newPath = `${parentPath}/${name}`;
    await this.dropboxClient.filesMoveV2({
      autorename: false,
      from_path: oldPath,
      to_path: newPath
    });

    if (node instanceof Artifact) {
      this.metadatas.setFile({
        id,
        metadata: newPath
      });
    } else {
      this.metadatas.setDirectory({
        id,
        metadata: newPath
      });
    }
  }

  renameable(node: Node) {
    return this.failIfRoot(node);
  }
}
