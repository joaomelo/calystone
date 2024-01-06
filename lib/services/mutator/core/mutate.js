import { asArray } from "@lib";
import { pack } from "./pack";

export function mutate(mutator, manifestOrManifests) {
  const manifests = asArray(manifestOrManifests);
  const mutations = manifests.map(({ data, method, name }) => ({
    name,
    method,
    record: pack(method, data),
  }));
  return mutator.mutate(mutations);
}
