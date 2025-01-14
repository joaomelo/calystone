import type { SupportService } from "./service";

export class DropboxSupport implements SupportService {
  supports() {
    return false;
  }
}