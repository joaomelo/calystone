import type { SupportService } from "./support";

export class CloudSupport implements SupportService {
  clientId: string | undefined;
  redirectUrl: string | undefined;

  constructor({ clientId, redirectUrl }: Options) {
    this.clientId = clientId;
    this.redirectUrl = redirectUrl;
  }

  access() {
    return typeof this.clientId === "string" && typeof this.redirectUrl === "string";
  }

  renameFile() {
    return this.access();
  }

  renameFolder() {
    return this.access();
  }
}

interface Options {
  clientId: string | undefined;
  redirectUrl: string | undefined;
};