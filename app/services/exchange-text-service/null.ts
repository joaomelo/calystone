import { NullThrower } from "@/utils";

import type { ExchangeTextService } from "./exchange";

export class NullExchangeTextService extends NullThrower implements ExchangeTextService {

  fetch(): never {
    this.throw();
  }

  post(): never {
    this.throw();
  }

}