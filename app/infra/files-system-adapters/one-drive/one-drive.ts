import type {
  Artifact,
  ArtifactOptions,
  Directory,
  DirectoryOptions,
  Id,
  Node,
  Nodes
} from "@/domain";
import type { DriveItem } from "@microsoft/microsoft-graph-types";

import { isId } from "@/domain";
import { throwError } from "@/utils";
import { Client } from "@microsoft/microsoft-graph-client";

import type { ArtifactOrDirectoryOptions } from "../file-system";

import { BaseFileSystemAdapter } from "../base";

export class OneDriveFileSystemAdapter extends BaseFileSystemAdapter<undefined, undefined> {
  graphClient: Client;

  constructor(options: {
    accessToken: string;
    nodes: Nodes;
  }) {
    const {
      accessToken,
      nodes
    } = options;
    const rootOptions: DirectoryOptions = {
      id: "root", // onedrive convention that will work to retrieve children in url paths
      name: "OneDrive",
      parentId: undefined
    };
    super({
      nodes,
      rootMetadata: undefined,
      rootOptions
    });

    this.graphClient = Client.init({ authProvider: (done) => {
      done(null, accessToken);
    }, });
  }

  async createArtifact(options: {
    name: string,
    parent: Directory
  }): Promise<ArtifactOptions> {
    const {
      name,
      parent: { id: parentId }
    } = options;

    const item = await this.graphClient
      .api(`/me/drive/items/${parentId}:/${name}:/content`)
      .put("") as DriveItem;

    const data = this.convertDriveItemToArtifactData({
      item,
      parentId
    });
    this.metadatas.setFile({
      id: data.id,
      metadata: undefined
    });
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

    const item = await this.graphClient
      .api(`/me/drive/items/${parentId}/children`)
      .post({
        "@microsoft.graph.conflictBehavior": "rename",
        folder: {},
        name
      }) as DriveItem;

    const data = this.convertDriveItemToDirectoryData({
      item,
      parentId
    });
    this.metadatas.setDirectory({
      id: data.id,
      metadata: undefined
    });
    return data;
  }

  async fetchContent(artifact: Artifact): Promise<ArrayBuffer> {
    // onedrive only returns the download url if the request is made exclusivy for it: https://stackoverflow.com/questions/57036249/search-query-doesnt-return-microsoft-graph-downloadurl
    const downloadUrl = await this.graphClient
      .api(`/me/drive/items/${artifact.id}`)
      .select("@microsoft.graph.downloadUrl")
      .get() as { "@microsoft.graph.downloadUrl": string };
    const response = await fetch(downloadUrl["@microsoft.graph.downloadUrl"]);
    const content = await response.arrayBuffer();
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

    await this.graphClient
      .api(`/me/drive/items/${subject.id}`)
      .update({ parentReference: { id: target.id } });
  }

  moveable(subject: Node) {
    return this.failIfRoot(subject);
  }

  async open(parent: Directory): Promise<ArtifactOrDirectoryOptions[]> {
    const { id: parentId } = parent;

    const response = await this.graphClient
      .api(`/me/drive/items/${parentId}/children`)
      .get() as { value: DriveItem[] };
    const { value: childrenResponse } = response;

    const childrenData: ArtifactOrDirectoryOptions[] = [];
    for (const childResponse of childrenResponse) {
      const driveItem = {
        item: childResponse,
        parentId
      };

      if (childResponse.folder) {
        const data = this.convertDriveItemToDirectoryData(driveItem);
        this.metadatas.setDirectory({
          id: data.id,
          metadata: undefined
        });
        childrenData.push(data);
        continue;
      }

      const data = this.convertDriveItemToArtifactData(driveItem);
      this.metadatas.setFile({
        id: data.id,
        metadata: undefined
      });
      childrenData.push(data);
    }

    return childrenData;
  }

  async postContent(artifact: Artifact): Promise<void> {
    // graph client expects a node implementation of the arraybuffer and will break if receives the browser one. we need to convert the buffer to a blob to make the request work.
    const blob = new Blob([artifact.toBinary()]);
    await this.graphClient
      .api(`/me/drive/items/${artifact.id}/content`)
      .put(blob);
  }

  async remove(node: Node): Promise<void> {
    const removeable = this.removeable(node);
    removeable.throwOnFail();

    await this.graphClient.api(`/me/drive/items/${node.id}`).delete();

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

    await this.graphClient
      .api(`/me/drive/items/${id}`)
      .patch({ name });
  }

  renameable(node: Node) {
    return this.failIfRoot(node);
  }

  private convertDriveItemToArtifactData(options: {
    item: DriveItem,
    parentId: Id
  }): ArtifactOptions {
    const {
      item,
      parentId
    } = options;

    if (!isId(item.id)) throwError("ONE_DRIVE_RESPONSE_WITH_INVALID_ID");
    if (typeof item.name !== "string") throwError("ONE_DRIVE_RESPONSE_WITH_INVALID_NAME");
    if (typeof item.lastModifiedDateTime !== "string") throwError("ONE_DRIVE_RESPONSE_WITH_INVALID_LAST_MODIFIED");
    if (typeof item.size !== "number") throwError("ONE_DRIVE_RESPONSE_WITH_INVALID_SIZE");
    if (typeof item.name !== "string") throwError("ONE_DRIVE_RESPONSE_WITH_INVALID_NAME");

    return {
      id: item.id,
      lastModified: new Date(item.lastModifiedDateTime).getTime(),
      name: item.name,
      parentId,
      size: item.size
    };
  }

  private convertDriveItemToDirectoryData(options: {
    item: DriveItem,
    parentId: Id
  }): DirectoryOptions {
    const {
      item,
      parentId
    } = options;
    if (!isId(item.id)) throwError("ONE_DRIVE_RESPONSE_WITH_INVALID_ID");
    if (typeof item.name !== "string") throwError("ONE_DRIVE_RESPONSE_WITH_INVALID_NAME");

    return {
      id: item.id,
      name: item.name,
      parentId
    };
  }

}
