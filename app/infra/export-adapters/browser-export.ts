import type { Node } from "@/domain";

import { Artifact } from "@/domain";
import {
  Status,
  throwCritical
} from "@/utils";

import type { ExportAdapter } from "./export";

export class BrowserExportAdapter implements ExportAdapter {

  async export(node: Node) {
    const exportable = this.exportable(node);
    exportable.throwOnFail();

    if (!(node instanceof Artifact)) throwCritical("NODE_NOT_ARTIFACT");

    const handle = await window.showSaveFilePicker({ suggestedName: node.name, });
    const writable = await handle.createWritable();
    await writable.write(node.toBinary());
    await writable.close();
  }

  exportable(node: Node): Status {
    if (typeof self === "undefined") return Status.fail("SELF_UNDEFINED");
    if (!("showSaveFilePicker" in self)) return Status.fail("SHOW_SAVE_FILE_PICKER_NOT_SUPPORTED");

    if (!node.isLoaded()) return Status.fail("NODE_NOT_LOADED");
    if (!(node instanceof Artifact)) return Status.fail("NODE_NOT_ARTIFACT");

    return Status.ok();
  }
}