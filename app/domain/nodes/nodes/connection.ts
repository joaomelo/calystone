import type { Node } from "@/domain/nodes";

export abstract class NodesConnection {
  abstract load(): AsyncGenerator<Node>;
}