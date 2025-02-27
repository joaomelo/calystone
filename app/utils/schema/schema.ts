import type { ZodSchema } from "zod";

import { reactive } from "vue";

export { z as s } from "zod";

interface Options<T> {
  data: T
  schema: ZodSchema<T>
}

export function useSchema<T>({ data, schema }: Options<T>) {
  const errors = reactive<Record<string, string | undefined>>({});

  function validate(): boolean {
    const result = schema.safeParse(data);
    Object.keys(errors).forEach((key) => (errors[key] = undefined));
    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      Object.entries(fieldErrors).forEach(([fieldName, fieldErrors]) => {
        if (Array.isArray(fieldErrors) && typeof fieldErrors[0] === "string") {
          errors[fieldName] = fieldErrors[0];
        }
      });
    }
    return result.success;
  }

  return { errors, validate };
}