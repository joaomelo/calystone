import { DropboxAccess } from "@/infra/access-services";
import { DropboxNodesRepository } from "@/infra/nodes-repositories";
import { DropboxSupport } from "@/infra/support-services";

import type { SourceSuite } from "./suite";

export class DropboxSuite implements SourceSuite {
  access?: DropboxAccess;
  support: DropboxSupport;

  constructor() {
    this.support = new DropboxSupport();
  }

  repository() {
    return new DropboxNodesRepository();
  }

  request() {
    if (!this.access) {
      this.access = new DropboxAccess();
    }
    this.access.request();
  }

  supports() {
    return this.support.supports();
  }
}