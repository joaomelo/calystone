import { messageFrom } from "@lib";
import { reactive } from "vue";

export function useTask(fn, reset = () => ({})) {
  const payload = reactive(reset());

  const task = reactive({
    busy: false,
    error: null,
    result: null,
    run: () => Promise.resolve(),
  });

  task.run = async () => {
    try {
      task.busy = true;
      task.error = null;
      task.result = null;
      task.result = await fn(payload);
    }
    catch (e) {
      task.error = messageFrom(e);
      console.warn("task catch", e);
    }
    finally {
      Object.assign(payload, reset());
      task.busy = false;
    }
  };

  return { payload, task };
}
