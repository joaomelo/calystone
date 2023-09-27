import { reactive } from "vue";

export function useTask(fn) {
  const reactivePayload = reactive({});

  const task = reactive({
    busy: false,
    run: null,
  });

  task.run = async (maybePayload) => {
    try {
      task.busy = true;
      const finalPayload = maybePayload || reactivePayload;
      const result = await fn(finalPayload);
      return result;
    } finally {
      task.busy = false;
    }
  };

  return { task, payload: reactivePayload };
}
