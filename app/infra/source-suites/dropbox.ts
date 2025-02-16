import { DropboxAccess, NullAccess } from "@/infra/access-services";
import { DropboxNodesRepository } from "@/infra/nodes-repositories";
import { CloudSupport } from "@/infra/support-services";

import { SourceSuiteBase } from "./base";

export class DropboxSuite extends SourceSuiteBase<string> {

  constructor({ clientId, redirectUrl }: Options) {
    const support = new CloudSupport({ clientId, redirectUrl });
    const access = (support.supports() && clientId && redirectUrl)
      ? new DropboxAccess({ clientId, redirectUrl })
      : new NullAccess<string>();
    super({ access, support });
  }

  createRepository(accessToken: string) {
    return new DropboxNodesRepository(accessToken);
  }
}

interface Options {
  clientId: string | undefined
  redirectUrl: string | undefined
}