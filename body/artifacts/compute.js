import { computed } from "vue";
import { list } from "@lib";

export function computeArtifacts(dependencies, getter) {
  const { selector } = dependencies;
  return computed(() => {
    const artifacts = list(selector, "artifacts");
    return getter(artifacts);
  });
}
