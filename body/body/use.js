import { inject } from "vue";
import { useTask } from "@lib";
import { key } from "./key";

export function useBody() {
  const body = inject(key);
  if (!body)
    throw new Error(
      "the body singleton must be installed in the vue app as a plugin"
    );

  return body;
}

export function useWithBody(fn) {
  const body = useBody();
  const fnWithBody = (payload) => fn(payload, body);
  return fnWithBody;
}

export function useTaskWithBody(fn) {
  const body = useBody();
  const fnWithBody = (payload) => fn(payload, body);
  const taskWithBody = useTask(fnWithBody);
  return taskWithBody;
}
