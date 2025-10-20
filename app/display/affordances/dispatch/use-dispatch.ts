import { ref } from "vue";

import { useToast } from "@/display/affordances/dialogs";
import { useErrors } from "@/display/affordances/errors";
import { Severity } from "@/utils";

type Nullary = () => Promise<unknown>;

export function useDispatch() {
  const {
    apply,
    clear,
    errors
  } = useErrors();
  const { toast } = useToast();
  const loading = ref(false);

  async function dispatch(nullary: Nullary): Promise<boolean> {
    loading.value = true;
    clear();
    try {
      await nullary();
      return true;
    } catch (error) {
      console.error(error);
      apply(error);
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function dispatchOrToast(nullary: Nullary): Promise<boolean> {
    const result = await dispatch(nullary);
    if (!result && typeof errors.global === "string") {
      toast(Severity.Error, errors.global);
    }
    return result;
  }

  return {
    dispatch,
    dispatchOrToast,
    errors,
    loading
  };
}