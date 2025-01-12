import type { ArtifactData, Id, NodeDataAndKind } from "@/domain";
import type { DriveItem } from "@microsoft/microsoft-graph-types";

import { Client } from "@microsoft/microsoft-graph-client";

import { BaseNodesRepository } from "../base";
import { driveItemToNodeData } from "./item-to-node";

export class OneDriveNodesRepository extends BaseNodesRepository<undefined> {
  graphClient: Client;

  constructor(accessToken: string) {
    const rootData: NodeDataAndKind = {
      id: "root", // onedrive convention that will work to retrieve children in url paths
      kind: "directory",
      name: "OneDrive",
      parentId: undefined
    };
    super(rootData, undefined);

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

    const data = await Promise.all([fetchArtifactContent(id), fetchArtifactMetadata(id)]);

    return {
      ...data[0],
      ...data[1]
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
    await this.graphClient
      .api(`/me/drive/items/${id}/content`)
      .put(content);
  }
}
