import type { Status } from "@/utils";

import { NullThrower } from "@/utils";

import type { ShareNodeService } from "./share";

export class NullShareNodeService extends NullThrower implements ShareNodeService {

  share(): Promise<void> {
    this.throw();
  }

  shareable(): Status {
    this.throw();
  }
}