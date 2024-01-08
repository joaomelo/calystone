import Fuse from "fuse.js";

import { listArtifacts } from "./list";

export function searchArtifacts(dependencies, term) {
  const artifacts = listArtifacts(dependencies);
  if (typeof term !== "string" || term.length <= 1) return artifacts;

  const options = {
    keys: ["name", "notes"],
    minMatchCharLength: 2,
  };
  const fuse = new Fuse(artifacts, options);
  const results = fuse.search(term);
  return results.map(({ item }) => item);
}
