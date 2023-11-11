import type { Payload } from "@lib";

export interface State {
  readonly name: string;
  is(name: string): boolean;
  process(name?: string, payload?: Payload): Promise<void>;
}
