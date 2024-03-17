import { placeTagAfter, placeTagBefore } from "@body";
import { useDependencies } from "@lib";

export function useHandleDrag() {
  const dependencies = useDependencies();
  return ({ section, source, target }) => {
    const payload = { referenceId: target, sourceId: source };
    switch (section) {
      case "top": return placeTagBefore(dependencies, payload);
      case "bottom": return placeTagAfter(dependencies, payload);
    }
  };
}
