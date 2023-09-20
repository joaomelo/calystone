import { reactive } from "vue";
import { delay } from "../../lib";

export function useTask(fn, { delay: delayData } = {}) {
  const payload = reactive({});

  const task = reactive({
    busy: false,
    run: null,
  });

  task.run = async () => {
    try {
      task.busy = true;
      if (delayData) {
        await delay(delayData);
      }
      const result = await fn(payload);
      return result;
    } finally {
      task.busy = false;
    }
  };

  return { task, payload };
}
