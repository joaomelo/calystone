import { GoogleDriveAccess } from "@/infra/access-services";
import { GoogleDriveNodesRepository } from "@/infra/nodes-repositories";
import { GoogleDriveSupport } from "@/infra/support-services";

import type { SourceSuite } from "./suite";

export class GoogleDriveSuite implements SourceSuite {
  access?: GoogleDriveAccess;
  support: GoogleDriveSupport;

  constructor() {
    this.support = new GoogleDriveSupport();
  }

  repository() {
    return new GoogleDriveNodesRepository();
  }

  request() {
    if (!this.access) {
      this.access = new GoogleDriveAccess();
    }
    this.access.request();
  }

  supports() {
    return this.support.supports();
  }
}