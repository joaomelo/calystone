import { useTask } from "@lib";
import { signOut } from "@body";
import { goStart } from "@view";

export function useSignOut() {
  const { task } = useTask(async (dependencies) => {
    await signOut(dependencies);
    goStart(dependencies);
  });

  return task;
}
