import { useStore } from "@web/store";
import { useTask } from "@web/components";

export function useAdd() {
  const { artifacts } = useStore();
  const { task } = useTask(async (payload) => {
    await artifacts.add(payload);
  });
  return task;
}
