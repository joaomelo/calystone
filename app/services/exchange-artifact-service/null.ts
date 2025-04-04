import { NullThrower } from "@/utils";

import type { ExchangeArtifactService } from "./exchange";

export class NullExchangeArtifactService extends NullThrower implements ExchangeArtifactService {

  fetch(): Promise<ArrayBuffer> {
    this.throw();
  }

  post(): Promise<void> {
    this.throw();
  }

}