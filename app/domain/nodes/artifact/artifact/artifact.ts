import type { Source } from "@/domain/content";
import type { Id } from "@/domain/nodes/ids";
import type { Nodes } from "@/domain/nodes/nodes";

import { Mime } from "@/domain/content";
import { Node } from "@/domain/nodes/node";

import type { ArtifactConnection } from "../connection";

export class Artifact extends Node implements Source {
  private connection: ArtifactConnection;
  private content?: ArrayBuffer;
  readonly lastModified: number;
  readonly mime: Mime;
  readonly size: number;

  constructor({ connection, lastModified, name, nodes, parentId, size }: Options) {
    super({ name, nodes, parentId });
    this.lastModified = lastModified;
    this.size = size;
    this.connection = connection;
    this.mime = new Mime(name);
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

interface Options {
  lastModified: number;
  name: string;
  parentId?: Id;
  size: number;
  connection: ArtifactConnection;
  nodes: Nodes;
};
