import type { NodeOrId } from "@/domain";

import type { ConnectSourceService } from "../connect-source-service/connect";

import { Searcher } from "./searcher";

export class RetrieveNodesService {
  private readonly connectSourceService: ConnectSourceService;
  private readonly searcher: Searcher;

  constructor(connectSourceService: ConnectSourceService) {
    this.connectSourceService = connectSourceService;
    this.searcher = new Searcher();
  }

  get(nodeOrId: NodeOrId) {
    const { nodes } = this.connectSourceService.stateConnectedOrThrow();
    return nodes.get(nodeOrId);
  }

  getOrThrow(nodeOrId: NodeOrId) {
    const { nodes } = this.connectSourceService.stateConnectedOrThrow();
    return nodes.getOrThrow(nodeOrId);
  }

  has(nodeOrId: NodeOrId) {
    const { nodes } = this.connectSourceService.stateConnectedOrThrow();
    return nodes.has(nodeOrId);
  }

  list() {
    const { nodes } = this.connectSourceService.stateConnectedOrThrow();
    return nodes.list();
  }

  search(text: string) {
    const { nodes } = this.connectSourceService.stateConnectedOrThrow();
    return this.searcher.search({ nodes: nodes.list(), text });
  }
}