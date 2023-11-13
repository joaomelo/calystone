import { reactive } from "vue";
import { messageFrom } from "@lib";

export function useTask(callback) {
  const task = reactive({
    busy: false,
    error: null,
    run: () => Promise.resolve(),
  });

  task.run = async (payload) => {
    try {
      task.busy = true;
      task.error = null;
      await callback(payload);
    } catch (e) {
      task.error = messageFrom(e);
    } finally {
      task.busy = false;
    }
  };

  return task;
}
