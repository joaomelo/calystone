import type { Source } from "@/services/source";

import type { SourceAdapter } from "./source";

export interface SourceAdaptersPortfolio {
  get(source: Source): SourceAdapter<unknown>
}
