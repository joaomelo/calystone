import { OneDriveFileSystemAdapter } from "@/infra/files-system-adapters";
import { throwError } from "@/utils";
import { PublicClientApplication } from "@azure/msal-browser";

import type { AccessAdapter } from "../access";
interface Options {
  clientId: string;
  redirectUrl: string;
}

export class OneDriveAccessAdapter implements AccessAdapter {
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

  async request() {
    await this.msalInstance.initialize();
    const response = await this.msalInstance.handleRedirectPromise();

    if (!response) {
      await this.authenticateUserAtTheOneDriveWebsite();
    }

    if (!response) throwError("ONE_DRIVE_ACCESS_WITHOUT_RESPONSE");

    const tokenResponse = await this.msalInstance.acquireTokenSilent(response);
    const { accessToken } = tokenResponse;

    return new OneDriveFileSystemAdapter(accessToken);
  }

  private async authenticateUserAtTheOneDriveWebsite() {
    await this.msalInstance.initialize();

    // clear eventual previous session
    await this.msalInstance.handleRedirectPromise();

    const request = {
      scopes: ["User.Read", "Files.ReadWrite.All"],
    };
    await this.msalInstance.loginRedirect(request);
  }
}