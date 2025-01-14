import type { SupportService } from "./service";

export class GoogleDriveSupport implements SupportService {
  supports() {
    return false;
  }
}