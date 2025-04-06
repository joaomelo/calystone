import { NullThrower } from "@/utils";

import type { ShareNodeService } from "./share";

export class NullShareNodeService extends NullThrower implements ShareNodeService {

  share(): never {
    this.throw();
  }

  shareable(): never {
    this.throw();
  }
}