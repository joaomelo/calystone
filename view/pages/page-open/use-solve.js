import { ignite } from "@body";
import { useTask } from "@lib";

import { goStart } from "./navigation";

export function useSolve() {
  return useTask(async (dependencies) => {
    await ignite(dependencies);
    await goStart(dependencies);
  });
}
