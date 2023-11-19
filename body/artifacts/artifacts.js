import { extractId, treeify, flatTree } from "@lib";
import { validate } from "./validate";

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
    const usersIds = [this.gate.userId];
    const artifact = validate({ ...payload, usersIds });
    return this.mutator.add(artifact);
  }

  edit(payload) {
    const artifact = validate(payload);
    return this.mutator.put(artifact);
  }

  del(maybeId) {
    const id = extractId(maybeId);

    const isRoot = (artifact) => extractId(artifact) === id;
    const tree = treeify(this.select.list(), { isRoot });
    const ids = flatTree(tree).map(extractId);

    return this.mutator.del(ids);
  }
}
