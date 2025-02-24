import type { SourceAdaptersPortfolio } from "@/services/adapters";
import type { Source } from "@/services/source";

export class SourcesService {
  portfolio: SourceAdaptersPortfolio;

  constructor(portfolio: SourceAdaptersPortfolio) {
    this.portfolio = portfolio;
  }

  // async bootstrap(source: Source) {
  //   const suite = this.portfolio.get(source);
  //   const repository = await suite.createRepository();
  //   this.nodes.connect(repository);
  // }

  // exit() {
  //   this.nodes.disconnect();
  // }

  // async request(source: Source) {
  //   const suite = this.portfolio.get(source);
  //   await suite.access.request();
  // }

  support(source: Source) {
    return this.portfolio.get(source).resolveSupport();
  }
}
