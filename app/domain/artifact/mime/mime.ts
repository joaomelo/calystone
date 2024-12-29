import type { Type } from "./type";

import { solve } from "./solve";
import { type } from "./type";

export class Mime {
  readonly media: string;

  constructor(name: string) {
    this.media = solve(name);
  }

  type(): Type {
    return type(this.media);
  };
}
