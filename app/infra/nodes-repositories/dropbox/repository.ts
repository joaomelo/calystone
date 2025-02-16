import type { ArtifactData, Id, Kind, NodeDataAndKind } from "@/domain";

import { createId } from "@/domain";
import { throwError } from "@/utils";
import { Dropbox } from "dropbox";

import { NodesRepositoryBase } from "../base";

export class DropboxNodesRepository extends NodesRepositoryBase<string> {
  dropboxClient: Dropbox;

  constructor(accessToken: string) {
    const rootLowerPath = "";
    const rootData: NodeDataAndKind = {
      id: createId(),
      kind: "directory",
      name: "Dropbox",
      parentId: undefined
    };
    super({ rootData, rootMetadata: rootLowerPath });
    this.dropboxClient = new Dropbox({ accessToken });
  }

  async fetchArtifact(id: Id): Promise<ArtifactData> {
    const path = this.metadataOrThrow(id);
    const response = await this.dropboxClient.filesDownload({ path });

    // if (!("fileBlob" in response.result) || !response.result.fileBlob) {
    //   throwError("DROPBOX_FILE_DOWNLOAD_FAILURE", `No blob was returned when downloading '${id}'`);
    // }

    // const content = await response.result.fileBlob.arrayBuffer();
    const bytes = new TextEncoder().encode("todo");
    const content = new ArrayBuffer(bytes.length);
    const view = new Uint8Array(content);
    view.set(bytes);

    const size = response.result.size;
    const lastModified = response.result.server_modified
      ? new Date(response.result.server_modified).getTime()
      : 0;
    return { content, lastModified, size };
  }

  async openDirectory(id: Id): Promise<NodeDataAndKind[]> {
    const path = this.metadataOrThrow(id);
    const result = await this.dropboxClient.filesListFolder({ path });

    const entries = result.result.entries.map((entry) => {
      if (typeof entry.path_lower !== "string") {
        throwError("DROPBOX_UNMOUNTED_NODE", "cannot open dropbox directory with nodes that do not have a path");
      }

      const childId = createId();
      const childPath = entry.path_lower;

      this.nodesMetadata.set(childId, childPath);

      const kind: Kind = entry[".tag"] === "folder" ? "directory" : "artifact";
      const childData = {
        id: childId,
        kind,
        name: entry.name,
        parentId: id
      };
      return childData;
    });
    return entries;
  }

  async postArtifact(id: Id, content: ArrayBuffer): Promise<void> {
    await this.dropboxClient.filesUpload({
      contents: content,
      mode: { ".tag": "overwrite" },
      path: id
    });
  }
}
