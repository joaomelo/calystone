import { NullThrower } from "@/utils";

import type { ExchangeTextService } from "./exchange";

export class NullExchangeTextService extends NullThrower implements ExchangeTextService {

  fetch(): Promise<string> {
    this.throw();
  }

  post(): Promise<void> {
    this.throw();
  }

}