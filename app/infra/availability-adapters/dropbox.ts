import type { DropboxConfiguration } from "@/infra/source";

import { Status } from "@/utils";

import type { AvailabilityAdapter } from "./availability";

export class DropboxAvailabilityAdapter implements AvailabilityAdapter {
  private readonly clientId: string | undefined;
  private readonly redirectUrl: string | undefined;

  constructor({ clientId, redirectUrl }: DropboxConfiguration) {
    this.clientId = clientId;
    this.redirectUrl = redirectUrl;
  }

  available(): Status {
    if (typeof this.clientId !== "string") return Status.fail("CLIENT_ID_NOT_CONFIGURED");
    if (typeof this.redirectUrl !== "string") return Status.fail("REDIRECT_URL_NOT_CONFIGURED");
    return Status.ok();
  }
};