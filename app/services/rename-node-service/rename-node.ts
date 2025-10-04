import { z } from "zod";

import type { Node } from "@/domain";
import type { ConnectSourceService } from "@/services/connect-source-service";

import { useSchema } from "@/utils";

export class RenameNodeService {
  private readonly connectSource: ConnectSourceService;
  private readonly schema = useSchema(builder => builder.object({ name: z.string().nonempty({ message: "EMPTY_NAME" }), }));

  constructor(connectSource: ConnectSourceService) {
    this.connectSource = connectSource;
  }

  private inject() {
    const {
      fileSystemAdapter,
      nodes
    } = this.connectSource.stateConnectedOrThrow();
    return {
      fileSystemAdapter,
      nodes
    };
  }

  async rename(options: {
    name: string,
    node: Node
  }): Promise<void> {
    const {
      fileSystemAdapter,
      nodes
    } = this.inject();
    this.schema.validate(options);

    const adapterOptions = {
      name: options.name,
      node: options.node
    };
    await fileSystemAdapter.rename(adapterOptions);
    const node = nodes.getOrThrow(options.node.id);
    node.name = options.name;
  }

  renameable(node: Node) {
    const { fileSystemAdapter } = this.inject();
    return fileSystemAdapter.renameable(node);
  }

}