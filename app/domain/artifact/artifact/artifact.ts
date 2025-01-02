import type { NodeOptions } from "@/domain/node";

import { Node } from "@/domain/node";

import { Mime } from "../mime";

export class Artifact extends Node {
  content?: ArrayBuffer;
  lastModified?: number;
  readonly mime: Mime;
  size?: number;

  constructor(options: NodeOptions) {
    super(options);
    this.mime = new Mime(options.name);
  }

  async performLoad(): Promise<void> {
    const repository = this.nodes.repository;
    const data = await repository.fetchArtifact(this.id);
    this.content = data.content;
    this.lastModified = data.lastModified;
    this.size = data.size;
  }

  async post(content: ArrayBuffer): Promise<void> {
    const repository = this.nodes.repository;
    this.content = content;
    await repository.postArtifact(this.id, content);
  };
}
