import { useI18n } from "@/display/i18n";
import { Exception } from "@/utils";

import { useToast } from "./use-log";

export function useErrorToast() {
  const { t } = useI18n();
  const { Severity, toast: baseToast } = useToast();

  const errorToast = (error: unknown) => {
    // every exception is also an error, so this check must come first
    if (error instanceof Exception) {
      const message = t(`errors.${error.code}`);
      baseToast(error.severity, message, error.detail);
      return;
    }

    if (error instanceof Error) {
      baseToast(Severity.Error, error.message);
      return;
    }

    if (typeof error === "string") {
      baseToast(Severity.Error, error);
      return;
    }

    baseToast(Severity.Error, String(error));
  };

  return errorToast;
}
