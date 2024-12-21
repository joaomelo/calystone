import type { Pattern } from "./pattern";

export interface IgnoreRepository {
  loadPattern(): Promise<Pattern>;
  savePattern(pattern: Pattern): Promise<void>;
}