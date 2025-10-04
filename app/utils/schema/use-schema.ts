import type { ZodSchema } from "zod";

import { z } from "zod";

import {
  Exception,
  Exceptions,
  Severity
} from "@/utils/telemetry";

type Builder<T> = (builder: typeof z) => ZodSchema<T>;

export function useSchema<T>(builder: Builder<T>) {
  const parser = builder(z);

  function validate(data: unknown): data is T {
    const result = parser.safeParse(data);
    if (!result.success) {
      const exceptions: Exception[] = [];
      const {
        fieldErrors,
        formErrors
      } = result.error.flatten();

      formErrors.forEach((error) => {
        exceptions.push(new Exception({
          message: error,
          severity: Severity.Warning
        }));
      });

      Object.entries(fieldErrors).forEach(([fieldName, fieldErrors]) => {
        if (Array.isArray(fieldErrors) && typeof fieldErrors[0] === "string") {
          exceptions.push(new Exception({
            message: fieldErrors[0],
            path: fieldName,
            severity: Severity.Warning
          }));
        }
      });

      throw new Exceptions({ exceptions });
    }
    return result.success;
  }

  return { validate };
}