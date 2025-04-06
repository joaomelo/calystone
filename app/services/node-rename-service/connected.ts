import type { Node, Nodes } from "@/domain";
import type { FileSystemAdapter, SupportAdapter } from "@/infra";

import { useSchema } from "@/utils";
import { z } from "zod";

import type { NodeRenameService } from "./rename";

export class ConnectedNodeRenameService implements NodeRenameService {
  private readonly fileSystemAdapter: FileSystemAdapter;
  private readonly nodes: Nodes;
  private readonly schema = useSchema(builder => builder.object({
    name: z.string().nonempty({ message: "EMPTY_NAME" }),
  }));
  private readonly supportAdapter: SupportAdapter;

  constructor(options: { fileSystemAdapter: FileSystemAdapter, nodes: Nodes, supportAdapter: SupportAdapter }) {
    this.fileSystemAdapter = options.fileSystemAdapter;
    this.supportAdapter = options.supportAdapter;
    this.nodes = options.nodes;
  }

  async rename(options: { name: string, node: Node }): Promise<void> {
    this.schema.validate(options);
    const adapterOptions = { id: options.node.id, name: options.name };
    await this.fileSystemAdapter.renameNode(adapterOptions);
    const node = this.nodes.getOrThrow(options.node.id);
    node.name = options.name;
  }

  renameable(node: Node) {
    return this.supportAdapter.rename(node);
  }

}