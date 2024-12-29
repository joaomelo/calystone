import type { NodeDataAndNodes } from "@/domain/node";

import { Node } from "@/domain/node";
import { throwCritical } from "@/utils";

import { Mime } from "../mime";

export class Artifact extends Node {
  content?: ArrayBuffer;
  lastModified?: number;
  readonly mime: Mime;
  size?: number;

  constructor({ id, name, nodes, parentId }: NodeDataAndNodes) {
    super({ id, name, nodes, parentId });
    this.mime = new Mime(name);
  }

  async fetch(): Promise<void> {
    if (!this.nodes.repository){
      throwCritical("UNABLE_TO_FETCH_WITHOUT_REPOSITORY", "nodes must have a repository before fetching any artifact content");
    }

    if (!this.content || !this.lastModified || !this.size){ {
      const data = await this.nodes.repository.fetchArtifact(this.id);
      this.content = data.content;
      this.lastModified = data.lastModified;
      this.size = data.size;
    }
    }
  }

  async post(content: ArrayBuffer): Promise<void> {
    if (!this.nodes.repository){
      throwCritical("UNABLE_TO_POST_WITHOUT_REPOSITORY", "nodes must have a repository before posting any artifact content");
    }

    this.content = content;
    await this.nodes.repository.postArtifact(this.id, content);
  };
}
