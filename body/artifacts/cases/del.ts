import type { Driver } from "@service";
import type { Ideable, Treeable } from "@shared";
import type { Artifact } from "../artifact";

import { treeify, flatTree, extractId } from "@shared";
import { del } from "@service";

type From = {
  artifacts: Artifact[];
  driver: Driver;
};

export async function delArtifact(ideable: Ideable, from: From) {
  const { artifacts, driver } = from;
  const id = extractId(ideable);

  const isRoot = (artifact: Treeable) => artifact.id === id;
  const tree = treeify(artifacts, { isRoot });

  const ids = flatTree(tree).map((element) => element.id);

  await del(ids, { driver, name: "artifacts" });
}
