import { extractId, treeify, flatTree } from "@lib";

export class Artifacts {
  select;
  mutator;
  gate;

  constructor({ select, mutator, gate }) {
    this.select = select;
    this.mutator = mutator;
    this.gate = gate;
  }

  open(userId) {
    return this.select.open({
      field: "usersIds",
      operator: "array-contains",
      value: userId,
    });
  }

  close() {
    return this.select.close();
  }

  list(predicate) {
    return this.select.list(predicate);
  }

  computed(predicate) {
    return this.select.computed(predicate);
  }

  findById(id) {
    return this.select.findById(id);
  }

  add(payload) {
    const {
      usersIds = [this.gate.userId],
      name = null,
      notes = null,
      parentId = null,
      status = "active",
    } = payload;
    return this.mutator.add({ usersIds, name, notes, parentId, status });
  }

  edit(payload) {
    if (!payload.id) throw new Error("artifact edit requires a id to perform");
    return this.mutator.put(payload);
  }

  del(maybeId) {
    const id = extractId(maybeId);

    const isRoot = (artifact) => extractId(artifact) === id;
    const tree = treeify(this.select.list(), { isRoot });
    const ids = flatTree(tree).map(extractId);

    return this.mutator.del(ids);
  }
}
