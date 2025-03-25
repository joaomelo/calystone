import type { Node } from "@/domain";

import type { SupportAdapter } from "./support";

interface Options {
  enabled: boolean;
}

export class MemorySupportAdapter implements SupportAdapter {
  enabled: boolean;

  constructor(options: Options) {
    this.enabled = options.enabled;
  }

  access(): boolean {
    return this.enabled;
  }

  move(node: Node) {
    if (node.isRoot()) return false;
    return this.access();

  }

  remove(node: Node) {
    if (node.isRoot()) return false;
    return this.access();
  }

  rename() {
    return this.access();
  }
}