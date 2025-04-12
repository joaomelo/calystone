import type { Node } from "@/domain";
import type { ExportAdapter } from "@/infra";

export class ExportNodeService {
  private readonly exportAdapter: ExportAdapter;

  constructor(exportAdapter: ExportAdapter) {
    this.exportAdapter = exportAdapter;
  }

  async export(node: Node): Promise<void> {
    const exportable = this.exportable(node);
    exportable.throwOnFail();

    node.busy();
    try {
      await this.exportAdapter.export(node);
    } finally {
      node.idle();
    }
  }

  exportable(node: Node) {
    return this.exportAdapter.exportable(node);
  }
}