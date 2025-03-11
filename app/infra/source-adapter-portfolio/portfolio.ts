import type { SourceAdapter } from "@/infra/source-adapters";

import type { Source } from "./source";

export interface SourceAdapterPortfolio {
  get(source: Source): SourceAdapter<unknown>
}
