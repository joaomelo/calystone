import { asArray } from "@lib";

import { pack } from "./pack";

export class Manifest {
  mutations = [];

  constructor(draftOrDrafts) {
    this.push(draftOrDrafts);
  }

  list() {
    return this.mutations;
  }

  push(draftOrDrafts) {
    const drafts = asArray(draftOrDrafts);
    drafts.forEach(({ data, method, name }) => {
      this.mutations.push({
        method,
        name,
        record: pack(method, data),
      });
    });
  }
}
