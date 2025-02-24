import type { Nodes } from "@/domain";

import type { Source, SourcesConfiguration } from "./source";

import { ServicesPortfolio } from "./suites";
import { SourcesSupports } from "./supports";

export class SourcesService {
  nodes: Nodes;
  portfolio: ServicesPortfolio;
  supports: SourcesSupports;

  constructor({ data, nodes }: Options) {
    this.nodes = nodes;
    this.portfolio = new ServicesPortfolio(data);
    this.supports = new SourcesSupports(data);
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

  support(source: Source) {
    return this.supports.get(source);
  }
}

interface Options {
  data: SourcesConfiguration,
  nodes: Nodes
}