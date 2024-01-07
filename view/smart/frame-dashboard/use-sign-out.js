import { goStart } from "@view";
import { signOut } from "@body";
import { useTask } from "@lib";

export function useSignOut() {
  const { task } = useTask(async (dependencies) => {
    await signOut(dependencies);
    goStart(dependencies);
  });

  return task;
}
