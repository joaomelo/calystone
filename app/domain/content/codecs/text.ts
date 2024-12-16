import { Codec } from "./codec";

export class TextCodec extends Codec<string> {
  private decoder = new TextDecoder("utf-8");
  private encoder = new TextEncoder();

  decode(content: ArrayBuffer): string {
    return this.decoder.decode(content);
  }

  encode(content: string): ArrayBuffer {
    return this.encoder.encode(content).buffer as ArrayBuffer;
  }
}
