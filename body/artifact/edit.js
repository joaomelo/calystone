import { extractId, mutate } from "@lib";
import { atLeastOneField, parseDates } from "./parse";

export function editArtifact(dependencies, payload) {
  atLeastOneField(payload);

  const id = extractId(payload);
  const data = { id };

  if (payload.name !== undefined) data.name = payload.name;
  if (payload.notes !== undefined) data.notes = payload.notes;

  if (payload.start !== undefined || payload.end !== undefined) {
    const { start, end } = parseDates(payload);
    data.start = start;
    data.end = end;
  }

  const { mutator } = dependencies;
  return mutate(mutator, {
    name: "artifacts",
    method: "put",
    data,
  });
}
