import { throwCritical } from "@/utils";

import { BaseAccessService } from "../base";

export class DropboxAccessService extends BaseAccessService<undefined> {
  active() {
    return false;
  }

  performAccess() {
    throwCritical("DROPBOX_ACCESS_SERVICE_NOT_ACTIVE", "dropbox access service is not active");
    return Promise.resolve(undefined);
  }
}