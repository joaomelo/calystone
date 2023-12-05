import Fuse from "fuse.js";

export function searchArtifacts(term, body) {
  const allArtifacts = body.artifactsSelect.list();
  if (typeof term !== "string" || term.length <= 1) return allArtifacts;

  const options = {
    minMatchCharLength: 2,
    keys: ["name", "notes"],
  };
  const fuse = new Fuse(allArtifacts, options);
  const results = fuse.search(term);
  return results.map(({ item }) => item);
}
