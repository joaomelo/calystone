import { useTask } from "@web/components";
import { useStore } from "@web/store";

export function useOpen(onOpen) {
  const { db } = useStore();
  const { task } = useTask(async () => {
    await db.open();
    onOpen();
  });
  return task;
}
