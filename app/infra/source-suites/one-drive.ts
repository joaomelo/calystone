import { NullAccess, OneDriveAccess } from "@/infra/access-adapters";
import { OneDriveNodesRepository } from "@/infra/nodes-repositories";
import { CloudSupport } from "@/infra/support-services";

import { SourceSuite } from "./suite";

export class OneDriveSuite extends SourceSuite<string>{

  constructor({ clientId, redirectUrl }: Options) {
    const support = new CloudSupport({ clientId, redirectUrl });
    const access = (support.access() && clientId && redirectUrl)
      ? new OneDriveAccess({ clientId, redirectUrl })
      : new NullAccess<string>();
    super({ access, support });
  }

  performCreateRepository(accessToken: string) {
    return new OneDriveNodesRepository(accessToken);
  }
}

interface Options {
  clientId: string | undefined
  redirectUrl: string | undefined
}