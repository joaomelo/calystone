import { useToast } from "@/utils/dialogs";
import { Severity, useErrors } from "@/utils/telemetry";
import { ref } from "vue";

type Nullary = () => Promise<unknown>;

export function useDispatch() {
  const { apply, errors } = useErrors();
  const { toast } = useToast();
  const loading = ref(false);

  async function dispatch(nullary: Nullary): Promise<boolean> {
    loading.value = true;
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

  return { dispatch, dispatchOrToast, errors, loading };
}