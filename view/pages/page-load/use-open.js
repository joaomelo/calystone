import { useTask } from "@view/components";
import { useStore } from "@view/store";

export function useOpen(onOpen) {
  const { db } = useStore();
  const { task } = useTask(async () => {
    await db.open();
    onOpen();
  });
  return task;
}
