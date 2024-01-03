import { useDependencies } from "@lib";
import { hoistArtifact, lowerArtifact, transferArtifact } from "@body";

export function useDrag() {
  const dependencies = useDependencies();

  const handleDrag = ({ target, source, section }) => {
    if (target === source) return;

    if (section === "middle") {
      transferArtifact(dependencies, {
        id: source,
        parentId: target,
      });
    }

    if (section === "top") {
      hoistArtifact(dependencies, {
        id: source,
        siblingId: target,
      });
    }

    if (section === "bottom") {
      lowerArtifact(dependencies, {
        id: source,
        siblingId: target,
      });
    }
  };

  return handleDrag;
}
