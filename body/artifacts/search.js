import Fuse from "fuse.js";
import { listArtifacts } from "./list";

export function searchArtifacts(dependencies, term) {
  const artifacts = listArtifacts(dependencies);
  if (typeof term !== "string" || term.length <= 1) return artifacts;

  const options = {
    minMatchCharLength: 2,
    keys: ["name", "notes"],
  };
  const fuse = new Fuse(artifacts, options);
  const results = fuse.search(term);
  return results.map(({ item }) => item);
}
