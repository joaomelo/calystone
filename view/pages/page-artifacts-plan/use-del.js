import { useStore } from "@view/store";
import { useTask } from "@view/components";

export function useDel() {
  const { artifacts } = useStore();
  const { task } = useTask(async (artifactOrId) => {
    await artifacts.del(artifactOrId);
  });
  return task;
}
