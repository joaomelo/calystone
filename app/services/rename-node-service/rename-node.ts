import type { Node, Nodes } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import { throwError, useSchema } from "@/utils";
import { z } from "zod";

export class RenameNodeService {
  private fileSystemAdapter?: FileSystemAdapter;
  private readonly nodes: Nodes;
  private readonly schema = useSchema(builder => builder.object({
    name: z.string().nonempty({ message: "EMPTY_NAME" }),
  }));

  constructor(nodes: Nodes) {
    this.nodes = nodes;
  }

  provide(fileSystemAdapter: FileSystemAdapter) {
    this.fileSystemAdapter = fileSystemAdapter;
  }

  async rename(options: { name: string, node: Node }): Promise<void> {
    const fileSystemAdapter = this.inject();
    this.schema.validate(options);
    const adapterOptions = { name: options.name, node: options.node };
    await fileSystemAdapter.rename(adapterOptions);
    const node = this.nodes.getOrThrow(options.node.id);
    node.name = options.name;
  }

  renameable(node: Node) {
    const fileSystemAdapter = this.inject();
    return fileSystemAdapter.renameable(node);
  }

  private inject() {
    if (!this.fileSystemAdapter) throwError("FILE_SYSTEM_ADAPTER_NOT_PROVIDED");
    return this.fileSystemAdapter;
  }

}