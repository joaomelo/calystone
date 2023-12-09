import { useUseCase } from "@lib";
import { ignite } from "@body";
import { goStart } from "./navigation";

export function useSolveCase() {
  return useUseCase(async (dependencies) => {
    await ignite(dependencies);
    await goStart(dependencies);
  });
}
