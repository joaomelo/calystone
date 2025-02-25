import type { Source } from "@/services/source";

import type { SourceAdapter } from "./source";

export interface AdaptersPortfolio {
  get(source: Source): SourceAdapter<unknown>
}
