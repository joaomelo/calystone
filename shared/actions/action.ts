import type { Payload } from "@shared/data";

export type Action = {
  name: string;
  payload?: Payload;
};
