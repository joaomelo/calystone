import { NullAccess, OneDriveAccess } from "@/infra/access-services";
import { OneDriveNodesRepository } from "@/infra/nodes-repositories";
import { CloudSupport } from "@/infra/support-services";

import { SourceSuiteBase } from "./base";

export class OneDriveSuite extends SourceSuiteBase<string>{

  constructor({ clientId, redirectUrl }: Options) {
    const support = new CloudSupport({ clientId, redirectUrl });
    const access = (support.supports() && clientId && redirectUrl)
      ? new OneDriveAccess({ clientId, redirectUrl })
      : new NullAccess<string>();
    super({ access, support });
  }

  createRepository(accessToken: string) {
    return new OneDriveNodesRepository(accessToken);
  }
}

interface Options {
  clientId: string | undefined
  redirectUrl: string | undefined
}