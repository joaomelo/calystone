import { asArray } from "@lib";
import { pack } from "./pack";

export function mutate(mutator, manifestOrManifests) {
  const manifests = asArray(manifestOrManifests);
  const mutations = manifests.map(({ payload, method, name }) => ({
    name,
    method,
    record: pack(method, payload),
  }));
  return mutator.mutate(mutations);
}
