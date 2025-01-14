import type { SupportService } from "./service";

export class DropboxSupportService implements SupportService {
  supports() {
    return false;
  }
}