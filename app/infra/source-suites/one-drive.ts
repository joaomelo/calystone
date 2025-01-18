import type { Configuration } from "@/utils";

import { OneDriveAccess } from "@/infra/access-services";
import { OneDriveNodesRepository } from "@/infra/nodes-repositories";
import { OneDriveSupport } from "@/infra/support-services";

import type { SourceSuite } from "./suite";

export class OneDriveSuite implements SourceSuite{
  access?: OneDriveAccess;
  configuration: Configuration;
  support: OneDriveSupport;

  constructor(configuration: Configuration) {
    this.support = new OneDriveSupport(configuration);
    this.configuration = configuration;
  }

  accessOrCreate() {
    if (!this.access) {
      this.access = new OneDriveAccess(this.configuration);
    }
    return this.access;
  }

  async repository() {
    const accessToken = await this.accessOrCreate().acquire();
    return new OneDriveNodesRepository(accessToken);
  }

  async request() {
    await this.accessOrCreate().request();
  }

  supports() {
    return this.support.supports();
  }
}