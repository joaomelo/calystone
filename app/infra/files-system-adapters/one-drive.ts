import type { DirectoryDataOptions, Id } from "@/domain";
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

  renameDirectory(): Promise<void> {
    throwCritical("NOT_IMPLEMENTED", "method not implemented");
  }

  renameFile(): Promise<void> {
    throwCritical("NOT_IMPLEMENTED", "method not implemented");
  }
}
