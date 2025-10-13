import type { ConnectSourceService } from "@/services/connect-source-service";

import {
  Ascendancy,
  Creator,
  Descendancy,
  Mover,
  Renamer,
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

  creator() {
    const nodes = this.nodes();
    return new Creator(nodes);
  }

  renamer() {
    const nodes = this.nodes();
    return new Renamer(nodes);
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