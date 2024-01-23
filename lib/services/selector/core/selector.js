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

  // encapsulating the selects inside the selector enables client code to keep just one convenient reference to the selector and pass it to every body class. the app also has the option to instantiate all selects in one place and let the body classes access the selects as they need.
  set({ name, orderBy, wheres }) {
    const query = new Query({ name, orderBy, wheres });
    const select = new Select({ adapter: this.adapter, query });
    this.selects.set(select);
  }
}
