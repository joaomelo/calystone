import { reactive } from "vue";

type Command = () => Promise<void>;

export function useErrors() {
  const errors = reactive<Record<string, string | undefined>>({});

  return { dispatch, errors, reset };

  async function dispatch(command: Command): Promise<boolean> {
    reset();
    try {
      await command();
      return true;
    } catch (error) {
      console.error(error);

      if (typeof error === "string") {

      }

      errors.form = typeof error === "string"
        ? error
        : error instanceof Error
          ? error.message
          : "unknown error";

      const tError = (error: unknown) => {
        const baseKey = typeof error === "string"
          ? error
          : (error instanceof Exception)
            ? error.code
            : (error instanceof Error)
              ? error.message
              : "UNKNOWN_ERROR";

        const message = utils.te(baseKey)
          ? utils.t(baseKey)
          : utils.te(`errors.${baseKey}`)
            ? utils.t(`errors.${baseKey}`)
            : baseKey;

        return message;
      };

      return false;
    }
  }

  function reset() {
    Object.keys(errors).forEach((key) => {
      errors[key] = undefined;
    });
  }
}