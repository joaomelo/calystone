import type { Configuration } from "@/utils";

import type { SupportService } from "./service";

export class OneDriveSupport implements SupportService {
  hasConfiguration: boolean;

  constructor(configuration: Configuration) {
    const oneDriveClientId = configuration.get("oneDriveClientId");
    const oneDriveRedirectUrl = configuration.get("oneDriveRedirectUrl");
    this.hasConfiguration = typeof oneDriveClientId === "string" && typeof oneDriveRedirectUrl === "string";
  }

  supports() {
    return this.hasConfiguration;
  }
}