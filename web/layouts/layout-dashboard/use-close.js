import { useStore } from "@web/store";
import { useTask } from "@web/components";

export function useClose(onClose) {
  const { db } = useStore();
  const { task } = useTask(() => {
    db.close();
    onClose();
  });
  return task;
}
