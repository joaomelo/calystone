import { useToast } from "@/utils/dialogs";
import { Exception, Exceptions, Severity } from "@/utils/exception";
import { useI18n } from "@/utils/i18n";
import { reactive } from "vue";

type Command = () => Promise<void>;

export function useErrors() {
  const i18n = useI18n();
  const { toast } = useToast();
  const errors = reactive<Record<string, string | undefined>>({});

  return { dispatch, dispatchOrToast, errors, reset };

  async function dispatch(command: Command): Promise<boolean> {
    reset();
    try {
      await command();
      return true;
    } catch (error) {
      console.error(error);
      applyError(error);
      return false;
    }
  }

  async function dispatchOrToast(command: Command): Promise<boolean> {
    const result = await dispatch(command);
    if (!result && typeof errors.global === "string") {
      toast(Severity.Error, errors.global);
    }
    return result;
  }

  function reset() {
    Object.keys(errors).forEach((key) => {
      errors[key] = undefined;
    });
  }

  function applyError(error: unknown) {
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
}