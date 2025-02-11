import type { Configuration } from "@/utils";

import { throwError } from "@/utils";
import { DropboxAuth } from "dropbox";

import type { AccessService } from "./service";

export class DropboxAccess implements AccessService<string> {
  private readonly codeVerifierKey = "DBX_CODE_VERIFIER";
  private dropboxClientId: string;
  private dropboxRedirectUrl: string;

  constructor(configuration: Configuration) {
    const dropboxClientId = configuration.get("dropboxClientId");
    const dropboxRedirectUrl = configuration.get("dropboxRedirectUrl");
    if (typeof dropboxClientId !== "string" || typeof dropboxRedirectUrl !== "string") {
      throwError(
        "DROPBOX_ACCESS_MISSING_CONFIGURATION",
        "Dropbox access service is missing configuration."
      );
    }
    this.dropboxClientId = dropboxClientId;
    this.dropboxRedirectUrl = dropboxRedirectUrl;
  }

  /**
   * acquire() should be called after the user is redirected back to your app. It
   * exchanges the 'code' in the query params for an access token.
   */
  async acquire(): Promise<string> {
    // Parse the returned "code" param from Dropbox
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (!code) {
      throwError(
        "DROPBOX_CODE_NOT_FOUND",
        "No authorization code found. Did you forget to call request() first?"
      );
    }

    // Retrieve the PKCE code verifier from storage
    const storedVerifier = localStorage.getItem(this.codeVerifierKey);
    if (!storedVerifier) {
      throwError(
        "DROPBOX_CODE_VERIFIER_NOT_FOUND",
        "No PKCE code verifier found in storage. The request() -> acquire() flow may have been interrupted."
      );
    }

    // Create a new DropboxAuth instance with the same clientId
    const dropboxAuth = new DropboxAuth({
      clientId: this.dropboxClientId,
    });

    // Restore the stored code verifier
    dropboxAuth.setCodeVerifier(storedVerifier);

    // Exchange the code for an access token
    const tokenResult = await dropboxAuth.getAccessTokenFromCode(this.dropboxRedirectUrl, code);
    const accessToken = tokenResult.access_token;
    if (!accessToken) {
      throwError(
        "DROPBOX_ACCESS_TOKEN_NOT_FOUND",
        "Failed to acquire the Dropbox access token. Check your app settings in Dropbox and/or the PKCE flow."
      );
    }

    // Optionally, if you need a refresh token:
    // const refreshToken = dropboxAuth.getRefreshToken();

    return accessToken;
  }

  /**
   * request() starts the OAuth flow by generating PKCE codes, building the
   * authorization URL, and redirecting the browser to Dropbox's login/consent page.
   */
  async request(): Promise<void> {
    // Create a DropboxAuth instance
    const dropboxAuth = new DropboxAuth({
      clientId: this.dropboxClientId,
    });

    // Generate PKCE code verifier and challenge
    await dropboxAuth.generatePKCECodes();

    // Persist the code verifier so we can restore it after redirect
    localStorage.setItem(this.codeVerifierKey, dropboxAuth.codeVerifier as string);

    // Get the authorization URL
    //   - 'code' for responseType
    //   - 'offline' so we can potentially get a refresh token
    //   - usePkce: true enables PKCE
    const authUrl = dropboxAuth.getAuthenticationUrl(
      this.dropboxRedirectUrl,
      undefined, // state
      "code", // responseType
      "offline", // tokenAccessType
      undefined, // forceReapprove
      "none", // disableGrantType
      true // usePkce
    );

    // Redirect to Dropbox
    window.location.assign(authUrl);
  }
}
