import { PublicClientApplication } from "@azure/msal-browser";

import { BaseAccessService } from "../base";

export class MsalAccessService extends BaseAccessService<string> {
  msalInstance: PublicClientApplication;

  constructor(clientId: string, redirectUri: string) {
    super();
    const msalConfig = {
      auth: {
        authority: "https://login.microsoftonline.com/common",
        clientId: clientId,
        redirectUri: redirectUri
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
      }
    };
    console.log(msalConfig);

    this.msalInstance = new PublicClientApplication(msalConfig);
  }

  active() {
    return true;
  }

  async performAccess() {
    const request = {
      scopes: ["User.Read", "Files.ReadWrite.All"],
    };
    await this.msalInstance.initialize();
    const loginResponse = await this.msalInstance.loginPopup(request);
    const tokenResponse = await this.msalInstance.acquireTokenSilent(loginResponse);
    const { accessToken } = tokenResponse;
    return accessToken;
  }
}