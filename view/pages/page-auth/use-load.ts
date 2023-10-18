import { useArtifacts } from "@body";
import { useTask } from "@view/components";

export function useLoad() {
  const load = async () => {
    const artifacts = useArtifacts();
    await artifacts.open();
  };
  const loadTask = useTask(load);
  return loadTask;
}
