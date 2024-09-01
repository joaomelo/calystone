import { placeArtifactInTagAfter, placeArtifactInTagBefore } from "@body";
import { useDependencies } from "@lib";
import { toValue } from "vue";

export function useHandleDrag(tagIdReference) {
  const dependencies = useDependencies();
  return ({ section, source, target }) => {
    const tagId = toValue(tagIdReference);
    const referenceId = target;
    switch (section) {
      case "bottom": return placeArtifactInTagAfter(dependencies, { loweredId: source, referenceId, tagId });
      case "top": return placeArtifactInTagBefore(dependencies, { hoistedId: source, referenceId, tagId });
    }
  };
}
