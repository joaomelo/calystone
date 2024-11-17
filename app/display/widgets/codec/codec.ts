export abstract class Codec<T> {
  abstract decode(content: ArrayBuffer): T;
  abstract encode(content: T): ArrayBuffer;
}
