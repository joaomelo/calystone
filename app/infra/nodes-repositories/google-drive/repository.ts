import type { ArtifactData, Id, Kind, NodeDataAndKind } from "@/domain";

import { throwError } from "@/utils";

import { NodesRepositoryBase } from "../base";

export class GoogleDriveNodesRepository extends NodesRepositoryBase<undefined> {
  readonly authorization: { Authorization: string } ;
  readonly baseUrl = "https://www.googleapis.com/drive/v3/files";

  constructor(accessToken: string) {
    const rootData: NodeDataAndKind = {
      id: "root",
      kind: "directory",
      name: "Google Drive",
      parentId: undefined
    };
    super(rootData, undefined);

    this.authorization = { Authorization: `Bearer ${accessToken}` } ;
  }

  async fetchArtifact(id: Id): Promise<ArtifactData> {
    const fetchFileContent = async (fileId: Id) => {
      const response = await fetch(`${this.baseUrl}/${fileId}?alt=media`, { headers: this.authorization });
      if (!response.ok) throwError("GOOGLE_DRIVE_FILE_DOWNLOAD_FAILURE", `failed to download file '${fileId}' content with: ${response.statusText}`);

      const content = await response.arrayBuffer();
      return { content };
    };

    const fetchFileMetadata = async (fileId: string) => {
      const response = await fetch(`${this.baseUrl}/${fileId}?fields=size,modifiedTime`, { headers: this.authorization });
      if (!response.ok) throwError("GOOGLE_DRIVE_FILE_METADATA_FAILURE", `failed to fetch metadata for file '${fileId}' with: ${response.statusText}`);

      const data = await response.json() as { modifiedTime?: string; size?: string };
      const size = data.size ? parseInt(data.size, 10) : 0;
      const lastModified = data.modifiedTime ? new Date(data.modifiedTime).getTime() : 0;
      return { lastModified, size };
    };

    const [contentData, metadataData] = await Promise.all([fetchFileContent(id), fetchFileMetadata(id)]);
    return { ...contentData, ...metadataData };
  }

  async openDirectory(id: Id): Promise<NodeDataAndKind[]> {
    const query = `'${id}' in parents and trashed = false`;
    const url = `${this.baseUrl}?fields=files(id,name,mimeType)&q=${encodeURIComponent(query)}`;

    const response = await fetch(url, { headers: this.authorization });
    if (!response.ok) throwError("GOOGLE_DRIVE_LIST_FILES_FAILURE", `failed to list Google Drive files for folder '${id}' with ${response.statusText}`);

    const data = await response.json() as { files?: { id: string; mimeType: string; name: string }[] };
    if (!data.files) return [];

    return data.files.map((file) => {
      const kind: Kind = file.mimeType === "application/vnd.google-apps.folder" ? "directory" : "artifact";
      return {
        id: file.id,
        kind,
        name: file.name,
        parentId: id
      };
    });
  }

  async postArtifact(id: Id, content: ArrayBuffer): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}?uploadType=media`, {
      body: content,
      headers: {
        ...this.authorization,
        "Content-Type": "application/octet-stream"
      },
      method: "PATCH"
    });
    if (!response.ok) throwError("GOOGLE_DRIVE_UPDATE_FILE_FAILURE", `failed to update file '${id}' with ${response.statusText}`);
  }
}
