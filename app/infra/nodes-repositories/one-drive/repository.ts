import type { ArtifactData, Id, NodeDataAndKind } from "@/domain";
import type { DriveItem } from "@microsoft/microsoft-graph-types";

import { Client } from "@microsoft/microsoft-graph-client";

import { NodesRepositoryBase } from "../base";
import { driveItemToNodeData } from "./item-to-node";

export class OneDriveNodesRepository extends NodesRepositoryBase<undefined> {
  graphClient: Client;

  constructor(accessToken: string) {
    const rootData: NodeDataAndKind = {
      id: "root", // onedrive convention that will work to retrieve children in url paths
      kind: "directory",
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

  async fetchArtifact(id: Id): Promise<ArtifactData> {
    const fetchArtifactContent = async (id: Id) => {
      // onedrive only returns the download url if the request is made exclusivy for it: https://stackoverflow.com/questions/57036249/search-query-doesnt-return-microsoft-graph-downloadurl
      const downloadUrl = await this.graphClient
        .api(`/me/drive/items/${id}`)
        .select("@microsoft.graph.downloadUrl")
        .get() as { "@microsoft.graph.downloadUrl": string };
      const response = await fetch(downloadUrl["@microsoft.graph.downloadUrl"]);
      const content = await response.arrayBuffer();
      return { content };
    };

    const fetchArtifactMetadata = async (id: Id) => {
      const fileMetadata = await this.graphClient
        .api(`/me/drive/items/${id}`)
        .select("size,lastModifiedDateTime")
        .get() as { lastModifiedDateTime: string, size: number };

      return {
        lastModified: new Date(fileMetadata.lastModifiedDateTime).getTime(),
        size: fileMetadata.size
      };
    };

    const [contentData, metadataData] = await Promise.all([fetchArtifactContent(id), fetchArtifactMetadata(id)]);

    return {
      ...contentData,
      ...metadataData
    };
  }

  async openDirectory(id: Id): Promise<NodeDataAndKind[]> {
    const response = await this.graphClient
      .api(`/me/drive/items/${id}/children`)
      .get() as { value: DriveItem[] };
    const { value: children } = response;
    return children.map((child) => driveItemToNodeData(child, id));
  }

  async postArtifact(id: Id, content: ArrayBuffer): Promise<void> {
    // graph client expects a node implementation of the arraybuffer and will break if receives the browser one. we need to convert the buffer to a blob to make the request work.
    const blob = new Blob([content]);
    await this.graphClient
      .api(`/me/drive/items/${id}/content`)
      .put(blob);
  }
}
