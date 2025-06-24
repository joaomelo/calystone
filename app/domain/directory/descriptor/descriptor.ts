import type { Directory } from "@/domain/directory/directory";
import type { NodeOrId } from "@/domain/node";
import type { Nodes } from "@/domain/nodes";

import { TextArtifact } from "@/domain/artifact";
import { Descendancy } from "@/domain/hierarchy";

export class Descriptor {
  static readonly descriptorBasename = "README";

  directory: Directory;
  nodes: Nodes;

  constructor(options: { directory: NodeOrId; nodes: Nodes }) {
    this.nodes = options.nodes;
    this.directory = this.nodes.getOrThrow(options.directory);
  }

  artifact(): TextArtifact | undefined {
    const descendancy = new Descendancy({ directory: this.directory, nodes: this.nodes });
    const children = descendancy.children();

    if (children.length === 0) return;

    const textArtifacts = children.filter(child => child instanceof TextArtifact);
    if (textArtifacts.length === 0) return;

    const artifact = textArtifacts.find(child => child.basename() === Descriptor.descriptorBasename);
    if (!artifact) return;

    return artifact;
  }

  description(): string {
    const artifact = this.artifact();
    if (!artifact) return "";
    return artifact.content;
  }
};