import type { Node } from "@/domain/nodes";

export abstract class Connection {
  abstract load(): AsyncGenerator<Node>;
}