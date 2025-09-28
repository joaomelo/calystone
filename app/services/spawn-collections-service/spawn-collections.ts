import type { ConnectSourceService } from "@/services/connect-source-service";

import {
  Ascendancy,
  Descendancy,
  Mover,
  Searcher,
  Todos
} from "@/domain";

export class SpawnCollectionsService {
  private readonly connectSourceService: ConnectSourceService;

  constructor(connectSourceService: ConnectSourceService) {
    this.connectSourceService = connectSourceService;
  }

  nodes() {
    const { nodes } = this.connectSourceService.stateConnectedOrThrow();
    return nodes;
  }

  ascendancy() {
    const nodes = this.nodes();
    return new Ascendancy(nodes);
  }

  descendancy() {
    const nodes = this.nodes();
    return new Descendancy(nodes);
  }

  mover() {
    const nodes = this.nodes();
    return new Mover(nodes);
  }

  searcher() {
    const nodes = this.nodes();
    return new Searcher({ nodes });
  }

  todos() {
    const nodes = this.nodes();
    return new Todos(nodes);
  }
}