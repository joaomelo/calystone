import { GoogleDriveAccess, NullAccess } from "@/infra/access-services";
import { GoogleDriveNodesRepository } from "@/infra/nodes-repositories";
import { CloudSupport } from "@/infra/support-services";

import { SourceSuiteBase } from "./base";

export class GoogleDriveSuite extends SourceSuiteBase<string> {
  constructor({ clientId, redirectUrl }: Options) {
    const support = new CloudSupport({ clientId, redirectUrl });
    const access = (support.supports() && clientId && redirectUrl)
      ? new GoogleDriveAccess({ clientId, redirectUrl })
      : new NullAccess<string>();
    super({ access, support });
  }

  createRepository(accessToken: string) {
    return new GoogleDriveNodesRepository(accessToken);
  }
}

interface Options {
  clientId: string | undefined
  redirectUrl: string | undefined
}