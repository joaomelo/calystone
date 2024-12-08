import type { Mime } from "../mime";

export interface Source {
  readonly mime: Mime;

  fetch(): Promise<ArrayBuffer>;
  post(content: ArrayBuffer): Promise<void>;
}