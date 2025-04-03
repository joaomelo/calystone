import type { Status } from "@/utils";

import { NullThrower } from "@/utils";

import type { CreateArtifactService } from "./create-artifact";

export class NullCreateArtifactService extends NullThrower implements CreateArtifactService{

  create(): Promise<void> {
    this.throw();
  }

  createbleOn(): Status {
    this.throw();
  }

}