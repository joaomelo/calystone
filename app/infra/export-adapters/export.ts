import type { Node } from "@/domain";
import type { Status } from "@/utils";

export interface ExportAdapter {
  exportable(node: Node): Status;
  export(node: Node): Promise<void>
}