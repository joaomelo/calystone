import { NullThrower } from "@/utils";

import type { CreateArtifactService } from "./create-artifact";

export class NullCreateArtifactService extends NullThrower implements CreateArtifactService{

  create(): never {
    this.throw();
  }

  createbleOn(): never {
    this.throw();
  }

}