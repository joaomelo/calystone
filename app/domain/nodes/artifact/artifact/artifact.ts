import type { Source } from "@/domain/content";

import { Mime } from "@/domain/content";
import { Node } from "@/domain/nodes/node";

import type { ArtifactConnection } from "../connection";

export class Artifact extends Node implements Source {
  private connection: ArtifactConnection;
  private content?: ArrayBuffer;
  readonly lastModified: number;
  readonly mime: Mime;
  readonly size: number;

  constructor(data: ArtifactData, connection: ArtifactConnection) {
    super(data.name, data.parentId);
    this.lastModified = data.lastModified;
    this.size = data.size;
    this.connection = connection;
    this.mime = new Mime(data.name);
  }

  async fetch(): Promise<ArrayBuffer> {
    if (!this.content) {
      this.content = await this.connection.fetch();
    }
    return this.content;
  }

  async post(content: ArrayBuffer): Promise<void> {
    this.content = content;
    await this.connection.post(content);
  };
}

type ArtifactData = Pick<Artifact, "lastModified" | "name" | "parentId" | "size">;
