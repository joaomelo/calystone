import { reactive } from "vue";
import { messageFrom } from "@lib";

type Callback<Payload> = (payload: Payload) => Promise<void>;

type Task<Payload> = {
  error: null | string;
  busy: boolean;
  run: Callback<Payload>;
};

export function useTask<Payload = void>(callback: Callback<Payload>) {
  const task: Task<Payload> = reactive({
    busy: false,
    error: null,
    run: () => Promise.resolve(),
  });

  task.run = async (payload: Payload) => {
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
