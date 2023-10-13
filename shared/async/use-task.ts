import { reactive } from "vue";
import { messageFrom } from "../errors";

type TaskCallback<Payload> = (payload: Payload) => Promise<void>;
type Task<Payload> = {
  error: null | string;
  busy: boolean;
  run: TaskCallback<Payload>;
};

export function useTask<Payload>(callback: TaskCallback<Payload>) {
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
