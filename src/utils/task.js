import { ref } from "vue";
import { delay } from "../utils";

export function useTask(task, { delay: seconds }) {
  const busy = ref(false);

  const run = async (payload) => {
    try {
      busy.value = true;
      if (seconds) {
        await delay(seconds);
      }
      const result = await task(payload);
      return result;
    } finally {
      busy.value = false;
    }
  };

  return { run, busy };
}
