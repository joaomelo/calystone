import { computed } from "vue";
import { select } from "@lib";

export function computeArtifacts(dependencies, getter) {
  const { selectAdapter } = dependencies;
  return computed(() => {
    const artifacts = select(selectAdapter, "artifacts");
    return getter(artifacts);
  });
}
