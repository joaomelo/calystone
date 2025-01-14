import type { SupportService } from "./service";

export class GoogleDriveSupportService implements SupportService {
  supports() {
    return false;
  }
}