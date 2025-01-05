import type { ArtifactData, Id, NodeDataAndKind } from "@/domain";
import type { DriveItem } from "@microsoft/microsoft-graph-types";

import { Client, ResponseType } from "@microsoft/microsoft-graph-client";

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
    const fileMetadata = await this.graphClient
      .api(`/me/drive/items/${id}`)
      .select("size,lastModifiedDateTime")
      .get() as { lastModifiedDateTime: string, size: number };

    const response = await this.graphClient
      .api(`/me/drive/items/${id}/content`)
      .responseType(ResponseType.ARRAYBUFFER)
      .get() as { arrayBuffer: () => Promise<ArrayBuffer> };

    const arrayBuffer = await response.arrayBuffer();

    return {
      content: arrayBuffer,
      lastModified: new Date(fileMetadata.lastModifiedDateTime).getTime(),
      size: fileMetadata.size
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
