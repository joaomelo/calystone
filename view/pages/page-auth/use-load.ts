import { useArtifacts } from "@body";
import { useTask } from "@view/components";

export function useLoad() {
  const artifacts = useArtifacts();
  const load = useTask(() => artifacts.open());
  return load;
}
