import type { Dater } from "./dater";
import type { Prioritizer } from "./prioritizer";
import type { Progressor } from "./progressor";
import type { Recurrer } from "./recurrer";
import type { Tagger } from "./tagger";

export interface TodoArtifactState {
  dater?: Dater;
  details: string;
  prioritizer: Prioritizer;
  progressor: Progressor;
  recurrer?: Recurrer;
  tagger: Tagger;
}