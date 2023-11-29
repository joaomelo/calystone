import { extractId, treeify, flatTree } from "@lib";
import { nextOrder } from "./order";
import { parse } from "./parse";
import { moveManifests } from "./move";

export class Artifacts {
  select;
  mutator;
  gate;

  constructor({ select, mutator, gate }) {
    this.select = select;
    this.mutator = mutator;
    this.gate = gate;
  }

  get isOpen() {
    return this.select.isOpen;
  }

  open() {
    return this.select.open({
      field: "userId",
      operator: "==",
      value: this.gate.userId,
    });
  }

  close() {
    return this.select.close();
  }

  list(predicate) {
    return this.select.list(predicate);
  }

  computed(getter) {
    return this.select.computed(getter);
  }

  findById(id) {
    return this.select.findById(id);
  }

  nextOrder(parentId) {
    return nextOrder(parentId, this.list());
  }

  add(payload) {
    const parsed = parse(payload);

    const { userId } = this.gate;
    const order = this.nextOrder(parsed.parentId);
    const complete = { ...parsed, userId, order };

    return this.mutator.add(complete);
  }

  append(parentId) {
    return this.add({ parentId });
  }

  transfer({ id, parentId = null }) {
    if (!id) throw new Error("artifact transfer requires a id to perform");
    const order = this.nextOrder(parentId);
    const payload = { id, parentId, order };

    return this.mutator.put(payload);
  }

  hoist({ id, siblingId }) {
    const { parentId, order } = this.findById(siblingId);
    return this.move({ id, parentId, order });
  }

  lower({ id, siblingId }) {
    const { parentId, order } = this.findById(siblingId);
    return this.move({ id, parentId, order: order + 1 });
  }

  move({ id, parentId, order }) {
    const manifests = moveManifests({
      id,
      parentId,
      list: this.list(),
      order,
    });

    return this.mutator.do(manifests);
  }

  edit(payload) {
    if (!payload.id) throw new Error("artifact edit requires a id to perform");
    return this.mutator.put(payload);
  }

  del(maybeId) {
    const id = extractId(maybeId);

    const isRoot = (artifact) => extractId(artifact) === id;
    const map = (payload) => ({ method: "del", payload });
    const tree = treeify(this.list(), { isRoot, map });
    const manifests = flatTree(tree);

    return this.mutator.do(manifests);
  }
}
