import { TextArtifact } from "@/domain/artifact";
import { Status } from "@/utils";

import { Node } from "../node";

export class Directory extends Node {
  static readonly descriptorBasename = "README";

  children(): Node[] {
    return this.nodes.list().filter(node => node.isChildOf(this));
  }

  descendants(): Node[] {
    return this.nodes.list().filter(node => node.isDescendantOf(this));
  }

  description(): string {
    const descriptor = this.descriptor();
    if (!descriptor) return "";
    return descriptor.content;
  }

  descriptor(): TextArtifact | undefined {
    const children = this.children();
    if (children.length === 0) return;

    const textArtifacts = children.filter(child => child instanceof TextArtifact);
    if (textArtifacts.length === 0) return;

    const descriptor = textArtifacts.find(child => child.basename() === Directory.descriptorBasename);
    if (!descriptor) return;

    return descriptor;
  }

  parentable(): Status {
    return Status.ok();
  }
};
