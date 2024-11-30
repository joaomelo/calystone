import type { ToastMessageOptions } from "primevue/toast";

import { Severity } from "@/utils";
import { useToast } from "primevue/usetoast";

export function useLogToast() {
  const toast = useToast();
  return (severity: Severity, message: string, detail: string) => {
    toast.add({
      detail,
      life: 5000,
      severity: convertSeverityToPrime(severity),
      summary: message,
    });
  };
}

type PrimeSeverity = Exclude<ToastMessageOptions["severity"], undefined>;
function convertSeverityToPrime(severity: Severity): PrimeSeverity {
  switch (severity) {
    case Severity.Alert:
    case Severity.Critical:
    case Severity.Emergency:
    case Severity.Error:
      return "error";
    case Severity.Debug:
    case Severity.Info:
      return "info";
    case Severity.Notice:
    case Severity.Warning:
      return "warn";
    default:
      return "info";
  }
}