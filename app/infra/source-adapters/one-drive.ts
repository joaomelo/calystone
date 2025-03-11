import { NullAccessAdapter, OneDriveAccessAdapter } from "@/infra/access-adapters";
import { OneDriveFileSystemAdapter } from "@/infra/files-system-adapters";
import { CloudSupportAdapter } from "@/infra/support-adapters";

import { BaseSourceAdapter } from "./base";

interface Options {
  clientId: string | undefined
  redirectUrl: string | undefined
}

export class OneDriveSourceAdapter extends BaseSourceAdapter<string> {

  constructor({ clientId, redirectUrl }: Options) {
    const support = new CloudSupportAdapter({ clientId, redirectUrl });
    const access = (support.access() && clientId && redirectUrl)
      ? new OneDriveAccessAdapter({ clientId, redirectUrl })
      : new NullAccessAdapter<string>();
    super({ access, support });
  }

  createFileSystemAdapter(accessToken: string) {
    return new OneDriveFileSystemAdapter(accessToken);
  }
}