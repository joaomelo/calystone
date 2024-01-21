import { Query } from "./query";
import { Select } from "./select";

export class Selector {
  adapter;
  selects = new Map();

  constructor(adapter) {
    this.adapter = adapter;
  }

  get(name) {
    return this.selects.get(name);
  }

  set({ name, orderBy, wheres }) {
    const query = new Query({ name, orderBy, wheres });
    const select = new Select({ adapter: this.adapter, query });
    this.selects.set(select);
  }
}
