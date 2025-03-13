import { useI18n } from "@/display/i18n";
import { Exception } from "@/utils";

import { useToast } from "./use-toast";

export function useErrorToast() {
  const { tError } = useI18n();
  const { Severity, toast: baseToast } = useToast();

  const errorToast = (error: unknown) => {
    console.error(error);

    const message = tError(error);
    if (error instanceof Exception) {
      baseToast(error.severity, message, error.detail);
      return;
    }
    baseToast(Severity.Error, message);
  };

  return errorToast;
}
