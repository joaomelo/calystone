import type { Driver } from "@service";
import type { Ideable } from "@shared";
import type { Artifact } from "../artifact";

import { treeify, flatTree, filterTree, extractId } from "@shared";
import { del } from "@service";

type From = {
  artifacts: Artifact[];
  driver: Driver;
};

export async function delArtifact(ideable: Ideable, from: From) {
  const { artifacts, driver } = from;
  const id = extractId(ideable);

  const tree = treeify(artifacts);

  const filter = (artifact: Ideable) => extractId(artifact) === id;
  const subTree = filterTree(tree, filter);

  const ids = flatTree(subTree).map((element) => element.id);

  await del(ids, { driver, name: "artifacts" });
}
