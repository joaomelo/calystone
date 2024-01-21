import { Manifest } from "./manifest";

export class Mutator {
  adapter;

  constructor(adapter) {
    this.adapter = adapter;
  }

  add(name, data) {
    const manifest = new Manifest({ data, method: "add", name });
    return this.mutate(manifest);
  }

  arrayAdd(value) {
    return this.adapter.arrayAdd(value);
  }

  arrayDel(value) {
    return this.adapter.arrayDel(value);
  }

  del(name, data) {
    const manifest = new Manifest({ data, method: "del", name });
    return this.mutate(manifest);
  }

  mutate(manifest) {
    return this.adapter.mutate(manifest);
  }

  put(name, data) {
    const manifest = new Manifest({ data, method: "put", name });
    return this.mutate(manifest);
  }
}
