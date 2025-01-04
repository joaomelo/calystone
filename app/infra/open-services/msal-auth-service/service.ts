import { PublicClientApplication } from "@azure/msal-browser";

export class MsalAuthService {
  msalInstance: PublicClientApplication;

  constructor(clientId: string, redirectUri: string) {
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
    this.msalInstance = new PublicClientApplication(msalConfig);
  }

  async signIn() {
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