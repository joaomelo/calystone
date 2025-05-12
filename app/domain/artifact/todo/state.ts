import type { Dater } from "@/domain/artifact/dater";
import type { Recurrer } from "@/domain/artifact/recurrer";

import type { Prioritizer } from "./prioritizer";
import type { Progressor } from "./progressor";
import type { Tagger } from "./tagger";

export interface TodoArtifactState {
  dater?: Dater;
  details: string;
  prioritizer: Prioritizer;
  progressor: Progressor;
  recurrer?: Recurrer;
  tagger: Tagger;
}