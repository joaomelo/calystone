import { asArray } from "@lib";
import { pack } from "./pack";

export class Mutator {
  name;
  adapter;

  constructor(name, adapter) {
    this.name = name;
    this.adapter = adapter;
  }

  add(payload) {
    return this.do({ method: "add", payload });
  }

  put(payload) {
    return this.do({ method: "put", payload });
  }

  del(payload) {
    return this.do({ method: "del", payload });
  }

  do(manifestOrManifests) {
    const manifests = asArray(manifestOrManifests);
    const mutations = manifests.map(({ method, payload }) => ({
      name: this.name,
      method,
      record: pack(method, payload),
    }));
    return this.adapter.mutate(mutations);
  }
}
