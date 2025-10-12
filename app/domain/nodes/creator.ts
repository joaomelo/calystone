import type {
  Artifact,
  ArtifactOptions
} from "@/domain/artifact";
import type { DirectoryOptions } from "@/domain/directory";
import type { Id } from "@/domain/id";
import type { Node } from "@/domain/node";

import { Directory } from "@/domain/directory";
import { createNode } from "@/domain/node-ops";
import { Status } from "@/utils";

import type { Nodes } from "./nodes";

import { Descendancy } from "./descendancy";

export class Creator {
  private readonly _descendancy: Descendancy;
  private readonly _nodes: Nodes;

  constructor(nodes: Nodes) {
    this._nodes = nodes;
    this._descendancy = new Descendancy(nodes);
  }

  create(options: ArtifactOptions): Artifact;
  create(options: DirectoryOptions): Directory;
  create(options: ArtifactOptions | DirectoryOptions): Artifact | Directory {
    const {
      name,
      parentId
    } = options;
    const creatable = this.createable({
      name,
      parent: parentId
    });
    creatable.throwOnFail();

    const node = createNode(options);
    this._nodes.set(node);
    return node;
  }

  createable({
    name,
    parent: parentOrId
  }: {
    name: string;
    parent?: Id | Node;
  }): Status {
    if (name.trim() === "") return Status.fail("NAME_CANNOT_BE_EMPTY");

    const parent = this._nodes.get(parentOrId);
    if (!parent || !(parent instanceof Directory)) return Status.fail("NEW_NODE_REQUIRES_KNOWN_PARENT_DIRECTORY");

    const siblings = this._descendancy.children(parent);
    const duplicate = siblings.find(s => s.name === name);
    if (duplicate) return Status.fail("ANOTHER_NODE_WITH_SAME_NAME_EXISTS");

    return Status.ok();
  }
}
