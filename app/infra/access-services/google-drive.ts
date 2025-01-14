import { throwCritical } from "@/utils";

import type { AccessService } from "./service";

export class GoogleDriveAccessService implements AccessService<void> {
  acquire() {
    throwCritical("GOOGLE_DRIVE_ACCESS_SERVICE_NOT_IMPLEMENTED", "google drive access service was not implemented");
  }

  request() {
    throwCritical("GOOGLE_DRIVE_ACCESS_SERVICE_NOT_IMPLEMENTED", "google drive access service was not implemented");
  }
}