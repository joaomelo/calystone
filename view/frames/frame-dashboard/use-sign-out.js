import { useUseCase } from "@lib";
import { signOut } from "@body";
import { goStart } from "@view";

export function useSignOut() {
  const { useCase } = useUseCase(async (dependencies) => {
    await signOut(dependencies);
    goStart(dependencies);
  });

  return useCase;
}
