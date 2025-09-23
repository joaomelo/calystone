import type { Prioritizer } from "@/domain/artifact/todo/prioritizer";
import type { Progressor } from "@/domain/artifact/todo/progressor";
import type { Scheduler } from "@/domain/schedule";
import type { Tagger } from "@/domain/tagger";

export interface TodoArtifactState {
  details: string;
  prioritizer: Prioritizer;
  progressor: Progressor;
  scheduler: Scheduler;
  tagger: Tagger;
}