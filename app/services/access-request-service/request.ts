import type { Source, SourcesAdaptersPortfolio } from "@/infra";

export class AccessRequestService {
  sourcesAdaptersPortfolio: SourcesAdaptersPortfolio;

  constructor(portfolio: SourcesAdaptersPortfolio) {
    this.sourcesAdaptersPortfolio = portfolio;
  }

  request(source: Source) {
    return this.sourcesAdaptersPortfolio.get(source).getAccess().request();
  }

  support(source: Source) {
    return this.sourcesAdaptersPortfolio.get(source).getSupport().access();
  }

}