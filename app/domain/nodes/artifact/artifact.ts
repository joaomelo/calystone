import type { Source } from "@/domain/content";
import type { Nodes } from "@/domain/nodes/nodes";

import { Mime } from "@/domain/content";
import { throwCritical } from "@/domain/lang";
import { Node } from "@/domain/nodes/node";

import type { ArtifactData } from "./data";

export class Artifact extends Node implements Source {
  private content?: ArrayBuffer;
  readonly lastModified: number;
  readonly mime: Mime;
  readonly size: number;

  constructor({ id, lastModified, name, nodes, parentId, size }: Options) {
    super({ id, name, nodes, parentId });
    this.lastModified = lastModified;
    this.size = size;
    this.mime = new Mime(name);
  }

  async fetch(): Promise<ArrayBuffer> {
    if (!this.nodes.repository){
      throwCritical("UNABLE_TO_FETCH_WITHOUT_REPOSITORY", "nodes must have a repository before fetching any artifact content");
    }

    if (!this.content) {
      this.content = await this.nodes.repository.fetchArtifactContent(this.id);
    }
    return this.content;
  }

  async post(content: ArrayBuffer): Promise<void> {
    if (!this.nodes.repository){
      throwCritical("UNABLE_TO_POST_WITHOUT_REPOSITORY", "nodes must have a repository before posting any artifact content");
    }

    this.content = content;
    await this.nodes.repository.postArtifactContent(this.id, content);
  };
}

type Options = { nodes: Nodes } & ArtifactData;
