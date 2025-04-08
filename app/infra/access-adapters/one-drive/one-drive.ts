import { throwError } from "@/utils";
import { PublicClientApplication } from "@azure/msal-browser";

import type { AccessAdapter } from "../access";

interface Options {
  clientId: string;
  redirectUrl: string;
}

export class OneDriveAccessAdapter implements AccessAdapter<string> {
  clientId: string;
  msalInstance: PublicClientApplication;

  constructor({ clientId, redirectUrl }: Options) {
    this.clientId = clientId;

    const msalConfig = {
      auth: {
        authority: "https://login.microsoftonline.com/common",
        clientId: clientId,
        navigateToLoginRequestUrl: false,
        redirectUri: redirectUrl,
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
    if (!response) throwError("ONE_DRIVE_ACCESS_WITHOUT_RESPONSE", "one drive access found no response to acquire");

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