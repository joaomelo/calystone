import type { Type } from "./type";

import { solve } from "./solve";
import { type } from "./type";

export class Mime {
  private mime: string;

  constructor(name: string) {
    this.mime = solve(name);
  }

  type(): Type {
    return type(this.mime);
  };
}
