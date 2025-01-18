import type { Configuration } from "@/utils";

import { throwError } from "@/utils";

import type { AccessService } from "./service";

export class GoogleDriveAccess implements AccessService<string> {
  googleDriveClientId: string;
  googleDriveRedirectUrl: string;

  constructor(configuration: Configuration) {
    const googleDriveClientId = configuration.get("googleDriveClientId");
    const googleDriveRedirectUrl = configuration.get("googleDriveRedirectUrl");
    if ( typeof googleDriveClientId !== "string" || typeof googleDriveRedirectUrl !== "string" ) {
      throwError( "GOOGLE_DRIVE_ACCESS_MISSING_CONFIGURATION", "Google drive access service is missing configuration");
    }
    this.googleDriveClientId = googleDriveClientId;
    this.googleDriveRedirectUrl = googleDriveRedirectUrl;
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
      client_id: this.googleDriveClientId,
      include_granted_scopes: "true",
      redirect_uri: this.googleDriveRedirectUrl,
      response_type: "token",
      scope: "https://www.googleapis.com/auth/drive.file",
    });
    window.location.assign(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
  }
}
