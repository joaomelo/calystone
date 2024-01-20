import { hoistArtifactOnTag, lowerArtifactOnTag } from "@body";
import { useDependencies } from "@lib";
import { toValue } from "vue";

export function useHandleDrag(tagIdReference) {
  const dependencies = useDependencies();
  return ({ section, source, target }) => {
    const tagId = toValue(tagIdReference);
    const referenceId = target;
    switch (section) {
      case "top": return hoistArtifactOnTag(dependencies, { hoistedId: source, referenceId, tagId });
      case "bottom": return lowerArtifactOnTag(dependencies, { loweredId: source, referenceId, tagId });
    }
  };
}
