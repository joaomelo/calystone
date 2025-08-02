import {
  LocalStorage,
  throwError
} from "@/utils";
import { DropboxAuth } from "dropbox";

import type { AccessAdapter } from "../access";

import { haltExecution } from "./halt";

export class DropboxAccessAdapter implements AccessAdapter<{ accessToken: string }> {
  auth: DropboxAuth;
  redirectUrl: string;
  storage: LocalStorage<string>;

  constructor(options: {
    clientId: string,
    redirectUrl: string,
  }) {
    const {
      clientId, redirectUrl
    } = options;
    this.auth = new DropboxAuth({ clientId });
    this.redirectUrl = redirectUrl;

    const asString = (data: unknown) => typeof data === "string" ? data : undefined;
    this.storage = new LocalStorage("dropboxCodeVerifier", asString);
  }

  async request() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const storedVerifier = this.storage.load();

    if (!code || !storedVerifier) {
      await this.authenticateUserAtTheDropboxWebsite();
      await haltExecution();
    }

    if (!code) throwError("DROPBOX_CODE_NOT_FOUND");
    if (!storedVerifier) throwError("DROPBOX_PKCE_VERIFIER_NOT_FOUND");

    this.auth.setCodeVerifier(storedVerifier);

    const { result } = await this.auth.getAccessTokenFromCode(this.redirectUrl, code);
    if (!("access_token" in result) || typeof result.access_token !== "string") {
      throwError("DROPBOX_ACCESS_TOKEN_NOT_FOUND");
    }
    this.auth.setAccessToken(result.access_token);

    return { accessToken: result.access_token };
  }

  private async authenticateUserAtTheDropboxWebsite() {
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
