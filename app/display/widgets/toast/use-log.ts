import type { ToastMessageOptions } from "primevue/toast";

import { Severity } from "@/domain";
import { useToast } from "primevue/usetoast";

export function useLogToast() {
  const primeToast = useToast();
  const toast = (severity: Severity, message: string, detail: string) => {
    primeToast.add({
      detail,
      life: 5000,
      severity: convertSeverityToPrime(severity),
      summary: message,
    });
  };

  return { Severity, toast };

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