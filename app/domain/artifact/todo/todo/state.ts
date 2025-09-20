import type { Tagger } from "@/domain/artifact/tagger";
import type { Dater } from "@/domain/artifact/todo/dater";
import type { Prioritizer } from "@/domain/artifact/todo/prioritizer";
import type { Progressor } from "@/domain/artifact/todo/progressor";
import type { Recurrer } from "@/domain/artifact/todo/recurrer";

export interface TodoArtifactState {
  dater?: Dater;
  details: string;
  prioritizer: Prioritizer;
  progressor: Progressor;
  recurrer?: Recurrer;
  tagger: Tagger;
}