import type { Exception } from "@/domain";

import { useI18n } from "@/display/i18n";

import { useLogToast } from "./use-log";

export function useExceptionToast() {
  const { t } = useI18n();
  const { toast: toastLog } = useLogToast();

  const toast = (exception: Exception) => {
    const message = t(`errors.${exception.code}`);
    toastLog(exception.severity, message, exception.detail);
  };

  return toast;
}
