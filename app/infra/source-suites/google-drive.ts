import type { Configuration } from "@/utils";

import { GoogleDriveAccess } from "@/infra/access-services";
import { GoogleDriveNodesRepository } from "@/infra/nodes-repositories";
import { GoogleDriveSupport } from "@/infra/support-services";

import type { SourceSuite } from "./suite";

export class GoogleDriveSuite implements SourceSuite {
  access?: GoogleDriveAccess;
  configuration: Configuration;
  support: GoogleDriveSupport;

  constructor(configuration: Configuration) {
    this.support = new GoogleDriveSupport(configuration);
    this.configuration = configuration;
  }

  accessOrCreate() {
    if (!this.access) {
      this.access = new GoogleDriveAccess(this.configuration);
    }
    return this.access;
  }

  repository() {
    const accessToken = this.accessOrCreate().acquire();
    return new GoogleDriveNodesRepository(accessToken);
  }

  request() {
    this.accessOrCreate().request();
  }

  supports() {
    return this.support.supports();
  }
}