import { NullThrower } from "@/utils";

import type { ExchangeArtifactService } from "./exchange";

export class NullExchangeArtifactService extends NullThrower implements ExchangeArtifactService {

  fetchInto(): never {
    this.throw();
  }

  postFrom(): never {
    this.throw();
  }

}