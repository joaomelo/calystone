import { DropboxAccessAdapter, NullAccessAdapter } from "@/infra/access-adapters";
import { DropboxFileSystemAdapter } from "@/infra/files-system-adapter";
import { CloudSupportAdapter } from "@/infra/support-adapters";

import { BaseSourceAdapter } from "./base";

interface Options {
  clientId: string | undefined
  redirectUrl: string | undefined
}

export class DropboxSourceAdapter extends BaseSourceAdapter<string> {

  constructor({ clientId, redirectUrl }: Options) {
    const support = new CloudSupportAdapter({ clientId, redirectUrl });
    const access = (support.access() && clientId && redirectUrl)
      ? new DropboxAccessAdapter({ clientId, redirectUrl })
      : new NullAccessAdapter<string>();
    super({ access, support });
  }

  createFileSystemAdapter(accessToken: string) {
    return new DropboxFileSystemAdapter(accessToken);
  }
}