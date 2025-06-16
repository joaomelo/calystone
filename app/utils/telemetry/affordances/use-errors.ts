import { useI18n } from "@/utils/i18n";
import { reactive } from "vue";

import { Exception, Exceptions } from "../exceptions";

export function useErrors() {
  const i18n = useI18n();
  const errors = reactive<Record<string, string | undefined>>({});

  function clear() {
    Object.keys(errors).forEach((key) => {
      errors[key] = undefined;
    });
  }

  function apply(error: unknown) {
    clear();

    if (error instanceof Exceptions) {
      const { list } = error;
      list.forEach((exception) => {
        errors[exception.path] = tError(exception.message);
      });
      return;
    }

    if (error instanceof Exception) {
      errors[error.path] = tError(error.message);
      return;
    }

    if (error instanceof Error) {
      errors.global = tError(error.message);
      return;
    }

    if (typeof error === "string") {
      errors.global = tError(error);
      return;
    }

    errors.global = tError("UNKNOWN_ERROR");
  }

  function tError(message: string) {
    return i18n.te(message)
      ? i18n.t(message)
      : i18n.te(`errors.${message}`)
        ? i18n.t(`errors.${message}`)
        : message;
  }

  return { apply, clear, errors };
}