import type { ZodSchema } from "zod";

import { reactive } from "vue";
import { z } from "zod";

type Builder<T> = (builder: typeof z) => ZodSchema<T>;

export function useSchema<T>(builder: Builder<T>) {
  const schema = builder(z);
  const errors = reactive<Record<string, string | undefined>>({});

  function validate(data: unknown): data is T {
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