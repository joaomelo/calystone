import { signOut } from "@body";
import { useTask } from "@lib";
import { goStart } from "@view";

export function useSignOut() {
  const { task } = useTask(async (dependencies) => {
    await signOut(dependencies);
    goStart(dependencies);
  });

  return task;
}
