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

  async repository() {
    if (!this.access) {
      // one drive workflow involves redirects. it is necessary to instantiate the access service again before acquiring the token.
      this.access = new OneDriveAccess(this.configuration);
    }
    const accessToken = await this.access.acquire();
    return new OneDriveNodesRepository(accessToken);
  }

  async request() {
    if (!this.access) {
      this.access = new OneDriveAccess(this.configuration);
    }
    await this.access.request();
  }

  supports() {
    return this.support.supports();
  }
}