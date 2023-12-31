import { mutate, extractId } from "@lib";
import { parseContent } from "./parse";

export function editArtifact(dependencies, payload) {
  const parsed = parse(payload);
  const { mutator } = dependencies;
  return mutate(mutator, { name: "artifacts", payload: parsed, method: "put" });
}

function parse(payload) {
  const id = extractId(payload);
  const { name, notes, start, end } = parseContent(payload);
  return {
    id,
    name,
    notes,
    start,
    end,
  };
}
