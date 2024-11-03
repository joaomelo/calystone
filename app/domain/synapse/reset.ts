import type { Artifacts } from "@/domain/artifacts";
import type { Source } from "@/domain/source";

import { closeSource } from "@/domain/source";

export function reset(artifacts: Artifacts, source: Source) {
  artifacts.clear();
  closeSource(source);
};