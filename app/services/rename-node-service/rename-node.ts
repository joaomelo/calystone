import type { Node } from "@/domain";
import type { ConnectSourceService } from "@/services/connect-source-service";

import { useSchema } from "@/utils";
import { z } from "zod";

export class RenameNodeService {
  private readonly connectSource: ConnectSourceService;
  private readonly schema = useSchema(builder => builder.object({ name: z.string().nonempty({ message: "EMPTY_NAME" }), }));

  constructor(connectSource: ConnectSourceService) {
    this.connectSource = connectSource;
  }

  async rename(options: {
    name: string,
    node: Node
  }): Promise<void> {
    const {
      fileSystemAdapter, nodes
    } = this.connectSource.stateConnectedOrThrow();
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
    const { fileSystemAdapter } = this.connectSource.stateConnectedOrThrow();
    return fileSystemAdapter.renameable(node);
  }

}