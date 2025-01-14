import { throwError } from "@/utils";
import { PublicClientApplication } from "@azure/msal-browser";

import type { AccessService } from "./service";

export class MsalAccessService implements AccessService<string> {
  msalInstance: PublicClientApplication;

  constructor(clientId: string, redirectUrl: string) {
    const msalConfig = {
      auth: {
        authority: "https://login.microsoftonline.com/common",
        clientId: clientId,
        redirectUri: redirectUrl
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
      }
    };
    this.msalInstance = new PublicClientApplication(msalConfig);
  }

  async acquire() {
    const response = await this.msalInstance.handleRedirectPromise();
    if (!response) throwError("ONE_DRIVE_ACCESS_REDIRECT_WITHOUT_RESPONSE", "the service found no response after it handle the redirect promise");

    const tokenResponse = await this.msalInstance.acquireTokenSilent(response);
    const { accessToken } = tokenResponse;
    return accessToken;
  }

  async request() {
    const request = {
      scopes: ["User.Read", "Files.ReadWrite.All"],
    };
    await this.msalInstance.initialize();
    await this.msalInstance.loginRedirect(request);
  }
}