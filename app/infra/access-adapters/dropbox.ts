import { throwError } from "@/utils";
import { DropboxAuth } from "dropbox";

import type { AccessAdapter } from "./access";

export class DropboxAccess implements AccessAdapter<string> {
  auth: DropboxAuth;
  readonly codeVerifierKey = "DBX_CODE_VERIFIER";
  redirectUrl: string;

  constructor({ clientId, redirectUrl }: Options) {
    this.auth = new DropboxAuth({ clientId });
    this.redirectUrl = redirectUrl;
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

    this.auth.setCodeVerifier(storedVerifier);

    const { result } = await this.auth.getAccessTokenFromCode(this.redirectUrl, code);
    if (!("access_token" in result) || typeof result.access_token !== "string") {
      throwError(
        "DROPBOX_ACCESS_TOKEN_NOT_FOUND",
        "failed to acquire the dropbox access token"
      );
    }
    this.auth.setAccessToken(result.access_token);

    return result.access_token;
  }

  async request() {
    const authUrl = await this.auth.getAuthenticationUrl(
      this.redirectUrl,
      undefined,
      "code",
      "offline",
      undefined,
      "none",
      true
    );
    sessionStorage.setItem(this.codeVerifierKey, this.auth.getCodeVerifier());
    window.location.assign(authUrl.valueOf());
  }
}

interface Options {
  clientId: string;
  redirectUrl: string;
}