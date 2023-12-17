import { computed } from "vue";
import { listItems } from "@lib";

export function computeArtifacts(dependencies, getter) {
  const { selector } = dependencies;
  return computed(() => {
    const artifacts = listItems(selector, "artifacts");
    return getter(artifacts);
  });
}
