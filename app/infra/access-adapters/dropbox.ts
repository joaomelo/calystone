import { LocalStorage } from "@/utils";
import { throwError } from "@/utils";
import { DropboxAuth } from "dropbox";

import type { AccessAdapter } from "./access";

interface Options {
  clientId: string;
  redirectUrl: string;
}

export class DropboxAccessAdapter implements AccessAdapter<string> {
  auth: DropboxAuth;
  redirectUrl: string;
  storage: LocalStorage<string>;

  constructor({ clientId, redirectUrl }: Options) {
    this.auth = new DropboxAuth({ clientId });
    this.redirectUrl = redirectUrl;

    const asString = (data: unknown) => typeof data === "string" ? data : undefined;
    this.storage = new LocalStorage("dropboxCodeVerifier", asString);
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

    const storedVerifier = this.storage.load();
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
    this.storage.save(this.auth.getCodeVerifier());
    window.location.assign(authUrl.valueOf());
  }
}