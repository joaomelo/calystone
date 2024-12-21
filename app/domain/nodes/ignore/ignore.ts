import type { Matcher } from "./matcher";
import type { Pattern } from "./pattern";
import type { IgnoreRepository } from "./repository";

export class Ignore implements Matcher {
  private pattern: Pattern = [];
  repository: IgnoreRepository;

  constructor(repository: IgnoreRepository) {
    this.repository = repository;
  }

  async load() {
    this.pattern = await this.repository.loadPattern();
    return this.pattern;
  }

  match(path: string) {
    return this.pattern.some(pattern => path.match(pattern));
  }

  async update(patterns: string[]) {
    this.pattern = patterns;
    await this.repository.savePattern(this.pattern);
  }
}