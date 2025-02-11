import type { Configuration } from "@/utils";

import { throwError } from "@/utils";
import { DropboxAuth } from "dropbox";

import type { AccessService } from "./service";

export class DropboxAccess implements AccessService<void> {
  readonly codeVerifierKey = "DBX_CODE_VERIFIER";
  dropboxAuth: DropboxAuth;
  dropboxRedirectUrl: string;

  constructor(configuration: Configuration) {
    const dropboxClientId = configuration.get("dropboxClientId");
    const dropboxRedirectUrl = configuration.get("dropboxRedirectUrl");
    if (typeof dropboxClientId !== "string" || typeof dropboxRedirectUrl !== "string") {
      throwError(
        "DROPBOX_ACCESS_MISSING_CONFIGURATION",
        "Dropbox access service is missing configuration."
      );
    }

    this.dropboxAuth = new DropboxAuth({ clientId: dropboxClientId });
    this.dropboxRedirectUrl = dropboxRedirectUrl;
  }

  async acquire() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (!code) {
      throwError(
        "DROPBOX_CODE_NOT_FOUND",
        "no authorization code found in the url"
      );
    }

    const storedVerifier = sessionStorage.getItem(this.codeVerifierKey);
    if (!storedVerifier) {
      throwError(
        "DROPBOX_PKCE_VERIFIER_NOT_FOUND",
        "no PKCE code verifier found in storage"
      );
    }

    this.dropboxAuth.setCodeVerifier(storedVerifier);

    const { result } = await this.dropboxAuth.getAccessTokenFromCode(this.dropboxRedirectUrl, code);
    if (!("access_token" in result) || typeof result.access_token !== "string") {
      throwError(
        "DROPBOX_ACCESS_TOKEN_NOT_FOUND",
        "failed to acquire the dropbox access token"
      );
    }
    this.dropboxAuth.setAccessToken(result.access_token);
  }

  async request() {
    const authUrl = await this.dropboxAuth.getAuthenticationUrl(
      this.dropboxRedirectUrl,
      undefined,
      "code",
      "offline",
      undefined,
      "none",
      true
    );
    sessionStorage.setItem(this.codeVerifierKey, this.dropboxAuth.getCodeVerifier());
    window.location.assign(authUrl.valueOf());
  }
}