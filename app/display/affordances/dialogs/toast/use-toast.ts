import type { ToastMessageOptions } from "primevue/toast";

import { useToast as usePrimeToast } from "primevue/usetoast";

import { Severity } from "@/utils";

type PrimeSeverity = Exclude<ToastMessageOptions["severity"], undefined>;

export function useToast() {
  const primeToast = usePrimeToast();
  const toast = (severity: Severity, message: string, detail?: string) => {
    primeToast.add({
      detail,
      life: 5000,
      severity: convertSeverityToPrime(severity),
      summary: message,
    });
  };

  return {
    Severity,
    toast
  };

}
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