import { throwCritical } from "@/utils";

import { BaseAccessService } from "../base";

export class GoogleIdentityAccessService extends BaseAccessService<undefined> {
  active() {
    return false;
  }

  performAccess() {
    throwCritical("GOOGLE_ACCESS_SERVICE_NOT_ACTIVE", "google access service is not active");
    return Promise.resolve(undefined);
  }
}