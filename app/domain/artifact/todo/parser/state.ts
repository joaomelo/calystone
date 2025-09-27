import type { Prioritizer } from "../prioritizer";
import type { Progressor } from "../progressor";
import type { Scheduler } from "../scheduler";
import type { Tagger } from "../tagger";

export interface TodoArtifactState {
  details: string;
  prioritizer: Prioritizer;
  progressor: Progressor;
  scheduler: Scheduler;
  tagger: Tagger;
}