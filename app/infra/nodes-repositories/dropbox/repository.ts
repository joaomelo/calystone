import type { ArtifactData, Id, Kind, NodeDataAndKind } from "@/domain";

import { throwError } from "@/utils";
import { Dropbox } from "dropbox";

import { NodesRepositoryBase } from "../base";

export class DropboxNodesRepository extends NodesRepositoryBase<undefined> {
  dropboxClient: Dropbox;

  constructor(accessToken: string) {
    const rootLowerPath = "";
    const rootData: NodeDataAndKind = {
      id: rootLowerPath,
      kind: "directory",
      name: "Dropbox",
      parentId: undefined
    };
    super({ rootData, rootMetadata: undefined });
    this.dropboxClient = new Dropbox({ accessToken });
  }

  async fetchArtifact(id: Id): Promise<ArtifactData> {
    if (id === "root") {
      throwError("DROPBOX_FETCH_ROOT_ARTIFACT", "Cannot fetch artifact for root directory");
    }

    const response = await this.dropboxClient.filesDownload({ path: id });

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
    const result = await this.dropboxClient.filesListFolder({ path: id });
    const entries = result.result.entries.map((entry) => {
      if (typeof entry.path_lower !== "string") {
        throwError("DROPBOX_UNMOUNTED_NODE", "cannot open dropbox directory with nodes that do not have a path");
      }

      const kind: Kind = entry[".tag"] === "folder" ? "directory" : "artifact";
      return {
        id: entry.path_lower,
        kind,
        name: entry.name,
        parentId: id
      };
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
