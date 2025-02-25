import { NullThrower } from "@/utils";

import type { TextService } from "./text";

export class NullTextService extends NullThrower implements TextService{

  fetch(): Promise<string> {
    this.throw();
  }

  post(): Promise<void> {
    this.throw();
  }

}