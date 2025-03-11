import type { Source, SourceAdapterPortfolio } from "@/infra";

export class AccessRequestService {
  sourceAdapterPortfolio: SourceAdapterPortfolio;

  constructor(portfolio: SourceAdapterPortfolio) {
    this.sourceAdapterPortfolio = portfolio;
  }

  request(source: Source) {
    return this.sourceAdapterPortfolio.get(source).getAccess().request();
  }

  support(source: Source) {
    return this.sourceAdapterPortfolio.get(source).getSupport().access();
  }

}