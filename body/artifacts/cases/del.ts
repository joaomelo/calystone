import type { Driver } from "@service";
import type { Idable, Treeable } from "@shared";
import type { Artifact } from "../artifact";

import { treeify, flatTree, extractId } from "@shared";
import { del } from "@service";

export async function artifactDel(
  Idable: Idable,
  artifacts: Artifact[],
  driver: Driver
) {
  const id = extractId(Idable);

  const isRoot = (artifact: Treeable) => artifact.id === id;
  const tree = treeify(artifacts, { isRoot });

  const ids = flatTree(tree).map((element) => element.id);

  await del(ids, { driver, name: "artifacts" });
}
