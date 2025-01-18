import type { Configuration } from "@/utils";

import type { SupportService } from "./service";

export class GoogleDriveSupport implements SupportService {
  hasConfiguration: boolean;

  constructor(configuration: Configuration) {
    const googleDriveClientId = configuration.get("googleDriveClientId");
    const googleDriveRedirectUrl = configuration.get("googleDriveRedirectUrl");
    this.hasConfiguration = typeof googleDriveClientId === "string" && typeof googleDriveRedirectUrl === "string";
  }

  supports() {
    return this.hasConfiguration;
  }
}
