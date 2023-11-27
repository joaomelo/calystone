import { extractId, treeify, flatTree } from "@lib";
import { nextOrder } from "./order";

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

  add(payload) {
    const {
      userId = this.gate.userId,
      name = null,
      notes = null,
      parentId = null,
      status = "active",
    } = payload;
    const order = nextOrder(parentId, this.select.list());

    return this.mutator.add({ userId, name, notes, parentId, status, order });
  }

  append(parentId) {
    return this.add({ parentId });
  }

  transfer({ itemId, parentId = null }) {
    if (!itemId) throw new Error("artifact transfer requires a id to perform");
    const order = nextOrder(parentId, this.select.list());
    return this.mutator.put({
      id: itemId,
      parentId,
      order,
    });
  }

  async hoist({ itemId, siblingId }) {
    const sibling = this.select.findById(siblingId);
    const upwards = this.select.list(
      (artifact) =>
        artifact.parentId === sibling.parentId &&
        artifact.order >= sibling.order &&
        artifact.id !== itemId
    );

    const promises = [
      this.mutator.put({
        id: itemId,
        parentId: sibling.parentId,
        order: sibling.order,
      }),
    ];

    upwards.forEach((upward) => {
      promises.push(
        this.mutator.put({
          id: upward.id,
          order: upward.order + 1,
        })
      );
    });

    await Promise.all(promises);
  }

  async lower({ itemId, siblingId }) {
    const sibling = this.select.findById(siblingId);
    const upwards = this.select.list(
      (artifact) =>
        artifact.parentId === sibling.parentId &&
        artifact.order > sibling.order &&
        artifact.id !== itemId
    );

    const promises = [
      this.mutator.put({
        id: itemId,
        parentId: sibling.parentId,
        order: sibling.order + 1,
      }),
    ];

    upwards.forEach((upward) => {
      promises.push(
        this.mutator.put({
          id: upward.id,
          order: upward.order + 1,
        })
      );
    });

    await Promise.all(promises);
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
