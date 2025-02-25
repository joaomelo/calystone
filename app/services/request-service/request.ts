import type { AdaptersPortfolio } from "@/services/adapters";
import type { Source } from "@/services/source";

export class RequestService {
  portfolio: AdaptersPortfolio;

  constructor(portfolio: AdaptersPortfolio) {
    this.portfolio = portfolio;
  }

  perform(source: Source) {
    return this.portfolio.get(source).getAccess().request();
  }

  support(source: Source) {
    return this.portfolio.get(source).getSupport().access();
  }

}