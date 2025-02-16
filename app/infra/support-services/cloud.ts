import type { SupportService } from "./service";

export class CloudSupport implements SupportService {
  clientId: string | undefined;
  redirectUrl: string | undefined;

  constructor(options: Options) {
    this.clientId = typeof options?.clientId === "string" ? options.clientId : undefined;
    this.redirectUrl = typeof options?.redirectUrl === "string" ? options.redirectUrl : undefined;;
  }

  supports() {
    return typeof this.clientId === "string" && typeof this.redirectUrl === "string";
  }
}

type Options = {
  clientId: unknown;
  redirectUrl: unknown;
} | undefined;