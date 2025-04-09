import type { Node, Nodes } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import { useSchema } from "@/utils";
import { z } from "zod";

import type { NodeRenameService } from "./rename";

export class ConnectedNodeRenameService implements NodeRenameService {
  private readonly fileSystemAdapter: FileSystemAdapter;
  private readonly nodes: Nodes;
  private readonly schema = useSchema(builder => builder.object({
    name: z.string().nonempty({ message: "EMPTY_NAME" }),
  }));

  constructor(options: { fileSystemAdapter: FileSystemAdapter, nodes: Nodes }) {
    this.fileSystemAdapter = options.fileSystemAdapter;
    this.nodes = options.nodes;
  }

  async rename(options: { name: string, node: Node }): Promise<void> {
    this.schema.validate(options);
    const adapterOptions = { name: options.name, node: options.node };
    await this.fileSystemAdapter.rename(adapterOptions);
    const node = this.nodes.getOrThrow(options.node.id);
    node.name = options.name;
  }

  renameable(node: Node) {
    return this.fileSystemAdapter.renameable(node);
  }

}