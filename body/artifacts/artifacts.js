import { treeify, flatTree } from "@shared";

export class Artifacts {
  selectOne(find) {
    return this._db.selectOne(this._name, find);
  }

  add(artifact) {
    return this._db.add({ name: this._name, payload: artifact });
  }

  edit(artifact) {
    return this._db.edit({ name: this._name, payload: artifact });
  }

  del(artifactOrId) {
    const id = artifactOrId?.id || artifactOrId;

    const isRoot = (artifact) => artifact.id === id;
    const tree = treeify(this.select(), { isRoot });

    const map = ({ id }) => id;
    const ids = flatTree(tree, { map });

    return this._db.del({ name: this._name, payload: ids });
  }
}
