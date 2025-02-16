import { throwError } from "@/utils";

import type { AccessService } from "./service";

export class GoogleDriveAccess implements AccessService<string> {
  clientId: string;
  redirectUrl: string;

  constructor({ clientId, redirectUrl }: Options) {
    this.clientId = clientId;
    this.redirectUrl = redirectUrl;
  }

  acquire() {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = hashParams.get("access_token");
    if (!accessToken) {
      throwError("GOOGLE_DRIVE_ACCESS_TOKEN_NOT_FOUND", "No access token found in the URL. Make sure to call request() or handle the redirect properly.");
    }
    return accessToken;
  }

  request() {
    const params = new URLSearchParams({
      client_id: this.clientId,
      include_granted_scopes: "true",
      redirect_uri: this.redirectUrl,
      response_type: "token",
      scope: "https://www.googleapis.com/auth/drive.file",
    });
    window.location.assign(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
  }
}

interface Options {
  clientId: string;
  redirectUrl: string;
}