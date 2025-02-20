import { DropboxAccess, NullAccess } from "@/infra/access-services";
import { DropboxNodesRepository } from "@/infra/nodes-repositories";
import { CloudSupport } from "@/infra/support-services";

import { SourceSuite } from "./suite";

export class DropboxSuite extends SourceSuite<string> {

  constructor({ clientId, redirectUrl }: Options) {
    const support = new CloudSupport({ clientId, redirectUrl });
    const access = (support.access() && clientId && redirectUrl)
      ? new DropboxAccess({ clientId, redirectUrl })
      : new NullAccess<string>();
    super({ access, support });
  }

  performCreateRepository(accessToken: string) {
    return new DropboxNodesRepository(accessToken);
  }
}

interface Options {
  clientId: string | undefined
  redirectUrl: string | undefined
}