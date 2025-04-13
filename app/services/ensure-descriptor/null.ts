import { NullThrower } from "@/utils";

import type { EnsureDescriptorService } from "./ensure";

export class NullEnsureDescriptorService extends NullThrower implements EnsureDescriptorService{

  ensure(): never {
    this.throw();
  }

  missing(): never {
    this.throw();
  }
}