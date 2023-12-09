import { reactive } from "vue";
import { messageFrom, useDependencies } from "@lib";

export function useUseCase(fn, initial = {}) {
  const dependencies = useDependencies();
  const payload = reactive({ ...initial });

  const useCase = reactive({
    busy: false,
    error: null,
    data: null,
    run: () => Promise.resolve(),
  });

  useCase.run = async () => {
    try {
      useCase.busy = true;
      useCase.error = null;
      useCase.data = null;
      // dependencies should come first so task functions that do not require payload can be declared with just the dependencies parameter
      useCase.data = await fn(dependencies, payload);
    } catch (e) {
      useCase.error = messageFrom(e);
      console.warn("task catch", e);
    } finally {
      Object.assign(payload, initial);
      useCase.busy = false;
    }
  };

  return { useCase, payload };
}
