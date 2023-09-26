import { useStore } from "@view/store";
import { useTask } from "@view/components";

export function useClose(onClose) {
  const { db } = useStore();
  const { task } = useTask(() => {
    db.close();
    onClose();
  });
  return task;
}
