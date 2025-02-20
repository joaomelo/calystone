import type { Nodes } from "@/domain";

import type { Source, SourcesConfiguration } from "./source";

import { SuitesPortfolio } from "./suites";

export class NodesService {
  nodes: Nodes;
  portfolio: SuitesPortfolio;

  constructor({ data, nodes }: Options) {
    this.nodes = nodes;
    this.portfolio = new SuitesPortfolio(data);
  }

  async bootstrap(source: Source) {
    const suite = this.portfolio.get(source);
    const repository = await suite.createRepository();
    this.nodes.connect(repository);
  }

  exit() {
    this.nodes.disconnect();
  }

  async request(source: Source) {
    const suite = this.portfolio.get(source);
    await suite.access.request();
  }

  supports(source: Source) {
    const suite = this.portfolio.get(source);
    return suite.support;
  }
}

interface Options {
  data: SourcesConfiguration,
  nodes: Nodes
}