import { useStore } from "@view/store";
import { useTask } from "@view/components";

export function useAdd() {
  const { artifacts } = useStore();
  const { task } = useTask(async (payload) => {
    await artifacts.add(payload);
  });
  return task;
}
