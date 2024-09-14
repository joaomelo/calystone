import { type Source } from "@data/sources";

export class Store {
  private source: null | Source = null;

  defineSource(source: Source) {
    this.source = source;
  }
}