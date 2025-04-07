import type { ArtifactDataOptions, DirectoryDataOptions, Id, Node } from "@/domain";
import type { Directory } from "@/domain";
import type { DriveItem } from "@microsoft/microsoft-graph-types";

import { isId } from "@/domain";
import { throwCritical, throwError } from "@/utils";
import { Client } from "@microsoft/microsoft-graph-client";

import type { ArtifactOrDirectoryDataOptions } from "./file-system";

import { BaseFileSystemAdapter } from "./base";

export class OneDriveFileSystemAdapter extends BaseFileSystemAdapter<undefined> {
  graphClient: Client;

  constructor(accessToken: string) {
    const rootData: DirectoryDataOptions = {
      id: "root", // onedrive convention that will work to retrieve children in url paths
      name: "OneDrive",
      parentId: undefined
    };
    super({ rootData, rootMetadata: undefined });

    this.graphClient = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });
  }

  async createArtifact(options: { name: string, parent: Directory }): Promise<ArtifactDataOptions> {
    const { name, parent: { id: parentId } } = options;

    const item = await this.graphClient
      .api(`/me/drive/items/${parentId}:/${name}:/content`)
      .put("") as DriveItem;

    return this.convertDriveItemToArtifactData({ item, parentId });
  }

  async createDirectory(options: { name: string, parent: Directory }): Promise<DirectoryDataOptions> {
    const { name, parent: { id: parentId } } = options;

    const item = await this.graphClient
      .api(`/me/drive/items/${parentId}/children`)
      .post({
        "@microsoft.graph.conflictBehavior": "rename",
        folder: {},
        name
      }) as DriveItem;

    return this.convertDriveItemToDirectoryData({ item, parentId });
  }

  async fetchContent(id: Id): Promise<ArrayBuffer> {
    // onedrive only returns the download url if the request is made exclusivy for it: https://stackoverflow.com/questions/57036249/search-query-doesnt-return-microsoft-graph-downloadurl
    const downloadUrl = await this.graphClient
      .api(`/me/drive/items/${id}`)
      .select("@microsoft.graph.downloadUrl")
      .get() as { "@microsoft.graph.downloadUrl": string };
    const response = await fetch(downloadUrl["@microsoft.graph.downloadUrl"]);
    const content = await response.arrayBuffer();
    return content;
  }

  async move(options: { subject: Node, target: Directory }): Promise<void> {
    const { subject, target } = options;

    const able = subject.moveable(target);
    able.throwOnFail();

    await this.graphClient
      .api(`/me/drive/items/${subject.id}`)
      .update({
        parentReference: {
          id: target.id
        }
      });
  }

  async open(id: Id): Promise<ArtifactOrDirectoryDataOptions[]> {
    const response = await this.graphClient
      .api(`/me/drive/items/${id}/children`)
      .get() as { value: DriveItem[] };
    const { value: childrenResponse } = response;

    const childrenData: ArtifactOrDirectoryDataOptions[] = [];
    for (const childResponse of childrenResponse) {
      const childData = childResponse.file
        ? this.convertDriveItemToArtifactData({ item: childResponse, parentId: id })
        : this.convertDriveItemToDirectoryData({ item: childResponse, parentId: id });
      childrenData.push(childData);
    }

    return childrenData;
  }

  async postContent({ content, id }: { content: ArrayBuffer; id: Id, }): Promise<void> {
    // graph client expects a node implementation of the arraybuffer and will break if receives the browser one. we need to convert the buffer to a blob to make the request work.
    const blob = new Blob([content]);
    await this.graphClient
      .api(`/me/drive/items/${id}/content`)
      .put(blob);
  }

  async remove(node: Node): Promise<void> {
    if (node.isRoot()) {
      throwCritical("CANNOT_REMOVE_ROOT", "cannot remove the root node");
    }
    await this.graphClient.api(`/me/drive/items/${node.id}`).delete();
    this.removeMetadata(node);
  }

  async rename(options: { id: Id, name: string }): Promise<void> {
    const { id, name } = options;
    await this.graphClient
      .api(`/me/drive/items/${id}`)
      .patch({ name });
  }

  private convertDriveItemToArtifactData(options: { item: DriveItem, parentId: Id }): ArtifactDataOptions {
    const { item, parentId } = options;

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

  private convertDriveItemToDirectoryData(options: { item: DriveItem, parentId: Id }): DirectoryDataOptions {
    const { item, parentId } = options;
    if (!isId(item.id)) throwError("ONE_DRIVE_RESPONSE_WITH_INVALID_ID");
    if (typeof item.name !== "string") throwError("ONE_DRIVE_RESPONSE_WITH_INVALID_NAME");

    return {
      id: item.id,
      name: item.name,
      parentId
    };
  }

}
