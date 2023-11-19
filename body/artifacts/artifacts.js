import { Mutator, Select } from "@lib";
import { validate } from "./validate";

export class Artifacts {
  select;
  mutator;

  constructor(driver) {
    this.select = new Select("artifacts", driver);
    this.mutator = new Mutator("artifacts", driver);
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

  add(payload) {
    const artifact = validate(payload);
    return this.mutator.add(artifact);
  }

  edit(payload) {
    const artifact = validate(payload);
    return this.mutator.put(artifact);
  }

  // del(maybeId) {
  //   const id = extractId(maybeId);

  //   const artifacts = this.select.list();
  //   const isRoot = (artifact) => extractId(artifact) === id;
  //   const tree = treeify(artifacts, { isRoot });
  //   const ids = flatTree(tree).map(extractId);

  //   return this.mutator.del(ids);
  // }
}
