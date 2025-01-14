import { throwCritical } from "@/utils";

import type { AccessService } from "./service";

export class DropboxAccessService implements AccessService<void> {
  acquire() {
    throwCritical("DROPBOX_ACCESS_SERVICE_NOT_IMPLEMENTED", "dropbox access service was not implemented");
  }

  request() {
    throwCritical("DROPBOX_ACCESS_SERVICE_NOT_IMPLEMENTED", "dropbox access service was not implemented");
  }
}