import { extractId, treeify, flatTree } from "@lib";
import { resolveOrder } from "./order";

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
    const order = resolveOrder(parentId, this.select.list());

    return this.mutator.add({ userId, name, notes, parentId, status, order });
  }

  append(parentId) {
    return this.add({ parentId });
  }

  transfer({ itemId, parentId = null }) {
    if (!itemId) throw new Error("artifact transfer requires a id to perform");
    const order = resolveOrder(parentId, this.select.list());
    return this.mutator.put({
      id: itemId,
      parentId,
      order,
    });
  }

  uplift({ itemId, siblingId }) {
    console.log({ itemId, siblingId });
    // // tem de deixar o parent igual e reordenar colocando o itemId na frente do siblingId
    // const artifactA = this.artifacts.find(artifact => artifact.id === itemId);
    // const artifactS = this.artifacts.find(artifact => artifact.id === siblingId);

    // if (!artifactA || !artifactS) {
    //   // Handle the case where either artifactA or artifactS is not found
    //   return;
    // }

    // // Update parentId of artifactA to match parentId of artifactS
    // artifactA.parentId = artifactS.parentId;

    // // Find all children of artifactS's parent
    // const siblings = this.artifacts.filter(
    //   artifact => artifact.parentId === artifactS.parentId
    // );

    // // Update orders for all siblings to accommodate artifactA
    // siblings.forEach(artifact => {
    //   if (artifact.order >= artifactS.order) {
    //     artifact.order += 1;
    //   }
    // });

    // // Set order of artifactA to be immediately smaller than artifactS
    // artifactA.order = artifactS.order - 1;
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
