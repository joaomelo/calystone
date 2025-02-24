import { NullAccessAdapter, OneDriveAccessAdapter } from "@/infra/access-adapters";
import { OneDriveFileSystemAdapter } from "@/infra/files-system-adapter";
import { CloudSupportAdapter } from "@/infra/support-adapters";

import { BaseSourceAdapter } from "./base";

export class OneDriveSourceAdapter extends BaseSourceAdapter<string> {

  constructor({ clientId, redirectUrl }: Options) {
    const support = new CloudSupportAdapter({ clientId, redirectUrl });
    const access = (support.access() && clientId && redirectUrl)
      ? new OneDriveAccessAdapter({ clientId, redirectUrl })
      : new NullAccessAdapter<string>();
    super({ access, support });
  }

  performCreateFileSystemAdapter(accessToken: string) {
    return new OneDriveFileSystemAdapter(accessToken);
  }
}

interface Options {
  clientId: string | undefined
  redirectUrl: string | undefined
}