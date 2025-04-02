import type { ArtifactDataOptions, DirectoryDataOptions, Id, Node } from "@/domain";
import type { Directory } from "@/domain";
import type { DriveItem } from "@microsoft/microsoft-graph-types";

import { isId } from "@/domain";
import { throwCritical, throwError, throwNull } from "@/utils";
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

  async createDirectory(options: { name: string, parent: Directory }): Promise<DirectoryDataOptions> {
    const { name, parent } = options;

    const response = await this.graphClient
      .api(`/me/drive/items/${parent.id}/children`)
      .post({
        "@microsoft.graph.conflictBehavior": "rename",
        folder: {},
        name
      }) as DriveItem;

    if (!isId(response.id)) throwError("ONE_DRIVE_RESPONSE_WITH_INVALID_ID");
    if (typeof response.name !== "string") throwError("ONE_DRIVE_RESPONSE_WITH_INVALID_NAME");

    const newDirectoryData: DirectoryDataOptions = {
      id: response.id,
      name: response.name,
      parentId: parent.id
    };

    return newDirectoryData;
  }

  createFile(): Promise<ArtifactDataOptions> {
    throwNull();
  }

  async fetchFileContent(id: Id): Promise<ArrayBuffer> {
    // onedrive only returns the download url if the request is made exclusivy for it: https://stackoverflow.com/questions/57036249/search-query-doesnt-return-microsoft-graph-downloadurl
    const downloadUrl = await this.graphClient
      .api(`/me/drive/items/${id}`)
      .select("@microsoft.graph.downloadUrl")
      .get() as { "@microsoft.graph.downloadUrl": string };
    const response = await fetch(downloadUrl["@microsoft.graph.downloadUrl"]);
    const content = await response.arrayBuffer();
    return content;
  }

  async moveNode(options: { subject: Node, target: Directory }): Promise<void> {
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

  async openDirectory(id: Id): Promise<ArtifactOrDirectoryDataOptions[]> {
    const response = await this.graphClient
      .api(`/me/drive/items/${id}/children`)
      .get() as { value: DriveItem[] };
    const { value: childrenResponse } = response;

    const childrenData: ArtifactOrDirectoryDataOptions[] = [];

    for (const childResponse of childrenResponse) {

      if (!isId(childResponse.id)) throwError("INVALID_ID", "driveItem from OneDrive has no id");
      if (typeof childResponse.name !== "string") throwError("NO_NAME", `driveItem from OneDrive with id ${childResponse.id} does not have a name`);

      let childData: ArtifactOrDirectoryDataOptions = {
        id: childResponse.id,
        name: childResponse.name,
        parentId: id,
      };

      if (childResponse.file) {
        const size = childResponse.size ?? 0;
        const lastModified = childResponse.lastModifiedDateTime
          ? new Date(childResponse.lastModifiedDateTime).getTime()
          : Date.now();

        childData = {
          ...childData,
          lastModified,
          size,
        };
      }
      childrenData.push(childData);
    }

    return childrenData;
  }

  async postFileContent({ content, id }: { content: ArrayBuffer; id: Id, }): Promise<void> {
    // graph client expects a node implementation of the arraybuffer and will break if receives the browser one. we need to convert the buffer to a blob to make the request work.
    const blob = new Blob([content]);
    await this.graphClient
      .api(`/me/drive/items/${id}/content`)
      .put(blob);
  }

  async removeNode(node: Node): Promise<void> {
    if (node.isRoot()) {
      throwCritical("CANNOT_REMOVE_ROOT", "cannot remove the root node");
    }
    await this.graphClient.api(`/me/drive/items/${node.id}`).delete();
    this.removeMetadata(node);
  }

  async renameNode(options: { id: Id, name: string }): Promise<void> {
    const { id, name } = options;
    await this.graphClient
      .api(`/me/drive/items/${id}`)
      .patch({ name });
  }
}
