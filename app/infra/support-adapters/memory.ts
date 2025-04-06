import type { Node } from "@/domain";

import { Status } from "@/utils";

import { SupportAdapter } from "./support";

interface Options {
  enabled: boolean;
}

export class MemorySupportAdapter extends SupportAdapter {
  enabled: boolean;

  constructor(options: Options) {
    super();
    this.enabled = options.enabled;
  }

  access() {
    return this.statusOfMemoryEnabled();
  }

  createArtifact() {
    return this.statusOfMemoryEnabled();
  }

  createDirectory() {
    return this.statusOfMemoryEnabled();
  }

  move(node: Node) {
    const rootStatus = this.failIfRoot(node);
    if (rootStatus.isFail()) return rootStatus;

    return this.statusOfMemoryEnabled();
  }

  remove(node: Node) {
    const rootStatus = this.failIfRoot(node);
    if (rootStatus.isFail()) return rootStatus;

    return this.statusOfMemoryEnabled();
  }

  rename() {
    return this.statusOfMemoryEnabled();
  }

  share(node: Node) {
    const directoryStatus = this.failIfDirectory(node);
    if (directoryStatus.isFail()) return directoryStatus;
    return Status.ok();
  }

  private statusOfMemoryEnabled() {
    if (!this.enabled) return Status.fail("MEMORY_NOT_ENABLED");
    return Status.ok();
  }
}