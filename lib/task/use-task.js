import { reactive } from "vue";
import { delay } from "../../lib";

export function useTask(fn, { delay: seconds }) {
  const task = reactive({
    busy: false,
    run: null,
  });

  task.run = async (payload) => {
    try {
      task.busy = true;
      if (seconds) {
        await delay(seconds);
      }
      const result = await fn(payload);
      return result;
    } finally {
      task.busy = false;
    }
  };

  return task;
}
