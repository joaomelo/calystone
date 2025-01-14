import type { Configuration } from "@/utils";

import { throwError } from "@/utils";
import { PublicClientApplication } from "@azure/msal-browser";

import type { AccessService } from "./service";

export class OneDriveAccess implements AccessService<string> {
  msalInstance: PublicClientApplication;
  oneDriveClientId: string;

  constructor(configuration: Configuration) {
    const oneDriveClientId = configuration.get("oneDriveClientId");
    const oneDriveRedirectUrl = configuration.get("oneDriveRedirectUrl");
    if (typeof oneDriveClientId !== "string" || typeof oneDriveRedirectUrl !== "string") throwError("ONE_DRIVE_ACCESS_MISSING_CONFIGURATION", "onedrive access service is missing configuration");

    this.oneDriveClientId = oneDriveClientId;

    const msalConfig = {
      auth: {
        authority: "https://login.microsoftonline.com/common",
        clientId: oneDriveClientId,
        navigateToLoginRequestUrl: false,
        redirectUri: oneDriveRedirectUrl,
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
      }
    };
    this.msalInstance = new PublicClientApplication(msalConfig);
  }

  async acquire() {
    await this.msalInstance.initialize();
    const response = await this.msalInstance.handleRedirectPromise();
    if (!response) throwError("ONE_DRIVE_ACCESS_REDIRECT_WITHOUT_RESPONSE", "the service found no response after it handle the redirect promise");

    const tokenResponse = await this.msalInstance.acquireTokenSilent(response);
    const { accessToken } = tokenResponse;

    return accessToken;
  }

  async request() {
    await this.msalInstance.initialize();

    // clear eventual previous session
    await this.msalInstance.handleRedirectPromise();

    const request = {
      scopes: ["User.Read", "Files.ReadWrite.All"],
    };
    await this.msalInstance.loginRedirect(request);
  }
}