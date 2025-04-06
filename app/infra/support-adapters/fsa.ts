import type { Node } from "@/domain";

import { Status } from "@/utils";

import { SupportAdapter } from "./support";

export class FsaSupportAdapter extends SupportAdapter {
  access() {
    return this.statusOfFileSystemAccessSupport();
  }

  createArtifact() {
    return this.statusOfFileSystemAccessSupport();
  }

  createDirectory() {
    return this.statusOfFileSystemAccessSupport();
  }

  move(subject: Node) {
    const rootStatus = this.failIfRoot(subject);
    if (rootStatus.isFail()) return rootStatus;

    const directoryStatus = this.failIfDirectory(subject);
    if (directoryStatus.isFail()) return directoryStatus;

    return this.statusOfFileSystemAccessSupport();
  }

  remove(node: Node) {
    const rootStatus = this.failIfRoot(node);
    if (rootStatus.isFail()) return rootStatus;

    return this.statusOfFileSystemAccessSupport();
  }

  rename(node: Node) {
    const directoryStatus = this.failIfDirectory(node);
    if (directoryStatus.isFail()) return directoryStatus;

    return this.statusOfFileSystemAccessSupport();
  }

  share() {
    return Status.fail("NOT_IMPLEMENTED");
  }

  private statusOfFileSystemAccessSupport() {
    if (typeof self === "undefined") return Status.fail("SELF_UNDEFINED");
    if (!("showOpenFilePicker" in self)) return Status.fail("SHOW_OPEN_FILE_PICKER_NOT_SUPPORTED");
    return Status.ok();
  }
}
