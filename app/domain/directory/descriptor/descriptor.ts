import type { NodeOrId } from "@/domain/node";
import type { Nodes } from "@/domain/nodes";

import { TextArtifact } from "@/domain/artifact";
import { Directory } from "@/domain/directory/directory";
import { Descendancy } from "@/domain/nodes";

export class Descriptor {
  static readonly descriptorBasename = "README";

  nodes: Nodes;

  constructor(nodes: Nodes) {
    this.nodes = nodes;
  }

  artifact(directoryOrId: NodeOrId): TextArtifact | undefined {
    const directory = this.nodes.getOrThrow(directoryOrId);
    if (!(directory instanceof Directory)) return;

    const descendancy = new Descendancy(this.nodes);
    const children = descendancy.children(directory);

    if (children.length === 0) return;

    const textArtifacts = children.filter(child => child instanceof TextArtifact);
    if (textArtifacts.length === 0) return;

    const artifact = textArtifacts.find(child => child.basename() === Descriptor.descriptorBasename);
    if (!artifact) return;

    return artifact;
  }

  description(directoryOrId: NodeOrId): string {
    const artifact = this.artifact(directoryOrId);
    if (!artifact) return "";
    return artifact.content;
  }
};