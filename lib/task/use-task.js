import { reactive } from "vue";
import { messageFrom, useDependencies } from "@lib";

export function useTask(fn, initial = {}) {
  const dependencies = useDependencies();
  const payload = reactive({ ...initial });

  const task = reactive({
    busy: false,
    error: null,
    data: null,
    run: () => Promise.resolve(),
  });

  task.run = async () => {
    try {
      task.busy = true;
      task.error = null;
      task.data = null;
      // dependencies should come first so task functions that do not require payload can be declared with just the dependencies parameter
      task.data = await fn(dependencies, payload);
    } catch (e) {
      task.error = messageFrom(e);
      console.warn("task catch", e);
    } finally {
      Object.assign(payload, initial);
      task.busy = false;
    }
  };

  return { task, payload };
}
