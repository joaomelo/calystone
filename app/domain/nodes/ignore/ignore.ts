import { minimatch } from "minimatch";

import type { Pattern } from "./pattern";
import type { IgnoreRepository } from "./repository";

export class Ignore {
  pattern: Pattern = [];
  repository: IgnoreRepository;

  constructor(repository: IgnoreRepository) {
    this.repository = repository;
  }

  ignores(path: string) {
    return this.pattern.some((pattern) => minimatch(path, pattern));
  }

  async load() {
    this.pattern = await this.repository.loadPattern();
    return this.pattern;
  }

  async update(patterns: string[]) {
    this.pattern = patterns;
    await this.repository.savePattern(this.pattern);
  }
}