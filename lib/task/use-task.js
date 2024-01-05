import { reactive } from "vue";
import { messageFrom, useDependencies } from "@lib";

export function useTask(fn, reset = () => ({})) {
  const dependencies = useDependencies();

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
      // dependencies should come first so task functions that do not require payload can be declared with just the dependencies parameter
      task.result = await fn(dependencies, payload);
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

  return { task, payload };
}
