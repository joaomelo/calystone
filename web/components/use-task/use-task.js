import { reactive } from "vue";

export function useTask(fn) {
  const payload = reactive({});

  const task = reactive({
    busy: false,
    run: null,
  });

  task.run = async () => {
    try {
      task.busy = true;
      const result = await fn(payload);
      return result;
    } finally {
      task.busy = false;
    }
  };

  return { task, payload };
}
