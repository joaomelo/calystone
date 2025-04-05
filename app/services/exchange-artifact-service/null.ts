import { NullThrower } from "@/utils";

import type { ExchangeArtifactService } from "./exchange";

export class NullExchangeArtifactService extends NullThrower implements ExchangeArtifactService {

  fetchInto(): Promise<void> {
    this.throw();
  }

  postFrom(): Promise<void> {
    this.throw();
  }

}