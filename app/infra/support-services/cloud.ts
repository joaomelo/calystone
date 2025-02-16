import type { SupportService } from "./service";

export class CloudSupport implements SupportService {
  clientId: string | undefined;
  redirectUrl: string | undefined;

  constructor({ clientId, redirectUrl }: Options) {
    this.clientId = clientId;
    this.redirectUrl = redirectUrl;
  }

  supports() {
    return typeof this.clientId === "string" && typeof this.redirectUrl === "string";
  }
}

interface Options {
  clientId: string | undefined;
  redirectUrl: string | undefined;
};