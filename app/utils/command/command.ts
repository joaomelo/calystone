import { reactive } from "vue";

type Command = () => Promise<void>;

export function useCommand(command: Command) {
  const errors = reactive<Record<string, string | undefined>>({});

  async function dispatch(): Promise<boolean> {
    try {
      await command();
      return true;
    } catch (error) {
      console.error(error);
      errors.form = typeof error === "string"
        ? error
        : error instanceof Error
          ? error.message
          : "unknown error";
      return false;
    }
  }

  return { dispatch, errors };
}