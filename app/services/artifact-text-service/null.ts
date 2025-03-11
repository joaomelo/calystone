import { NullThrower } from "@/utils";

import type { ArtifactTextService } from "./text";

export class NullArtifactTextService extends NullThrower implements ArtifactTextService{

  fetch(): Promise<string> {
    this.throw();
  }

  post(): Promise<void> {
    this.throw();
  }

}