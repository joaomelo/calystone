import { inject } from "vue";
import { key } from "./key";

export function useBody() {
  const body = inject(key);
  if (!body)
    throw new Error(
      "the body singleton must be installed in the vue app as a plugin"
    );

  return body;
}
