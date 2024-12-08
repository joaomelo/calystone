import type { Source } from "../source";

export abstract class Codec<T> {
  readonly source: Source;

  constructor(source: Source) {
    this.source = source;
  };

  abstract decode(content: ArrayBuffer): T;

  abstract encode(content: T): ArrayBuffer;

  async fetch(): Promise<T> {
    const buffer = await this.source.fetch();
    return this.decode(buffer);
  }

  async post(content: T): Promise<void> {
    const buffer = this.encode(content);
    await this.source.post(buffer);
  }
}
