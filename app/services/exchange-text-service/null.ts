import { NullThrower } from "@/utils";

import type { ExchangeTextService } from "./exchange";

export class NullExchangeTextService extends NullThrower implements ExchangeTextService {

  fetchInto(): never {
    this.throw();
  }

  postFrom(): never {
    this.throw();
  }

}