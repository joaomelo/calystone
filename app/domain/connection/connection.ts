import type { Node } from "@/domain/nodes";

import type { Status } from "./status";

export abstract class Connection {
  status: Status = "idle";

  abstract load(): AsyncGenerator<Node>;
}