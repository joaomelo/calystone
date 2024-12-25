import type { Matcher } from "./matcher";
import type { Pattern } from "./pattern";
import type { IgnoreRepository } from "./repository";

export class Ignore implements Matcher {
  pattern: Pattern = [];
  repository: IgnoreRepository;

  constructor(repository: IgnoreRepository) {
    this.repository = repository;
  }

  async load() {
    this.pattern = await this.repository.loadPattern();
    return this.pattern;
  }

  match(path: string) {
    // return this.pattern.some(pattern => path.match(pattern));
    this.pattern.forEach(pattern => { console.log(path, pattern); });
    return false;
  }

  async update(patterns: string[]) {
    this.pattern = patterns;
    await this.repository.savePattern(this.pattern);
  }
}