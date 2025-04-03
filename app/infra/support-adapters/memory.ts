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
    return this.isEnabled();
  }

  createArtifact(): boolean {
    return this.isEnabled();
  }

  createDirectory(): boolean {
    return this.isEnabled();
  }

  move(node: Node) {
    if (node.isRoot()) return false;
    return this.isEnabled();
  }

  remove(node: Node) {
    if (node.isRoot()) return false;
    return this.isEnabled();
  }

  rename() {
    return this.isEnabled();
  }

  private isEnabled() {
    return this.enabled;
  }
}