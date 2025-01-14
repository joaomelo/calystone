import type { NodesRepository } from "@/domain";

export interface SourceSuite {
  supports(): boolean;
  request(): Promise<void> | void;
  repository(): NodesRepository | Promise<NodesRepository>
}