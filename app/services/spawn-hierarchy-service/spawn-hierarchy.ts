import type { ConnectSourceService } from "@/services/connect-source-service";

import { Hierarchy } from "@/domain";

export class SpawnHierarchyService {
  private readonly connectSourceService: ConnectSourceService;

  constructor(connectSourceService: ConnectSourceService) {
    this.connectSourceService = connectSourceService;
  }

  spawn(): Hierarchy {
    const { nodes } = this.connectSourceService.stateConnectedOrThrow();
    return new Hierarchy(nodes);
  }

}