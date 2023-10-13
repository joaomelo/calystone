import type { ItemId } from "@shared";

import { useEdit } from "@service";
import { createIsId } from "./selectors";
import { useArtifact } from "./use-artifact";

export function useArtifactEdit(id: ItemId) {
  const edit = useEdit("artifacts");
  const artifact = useArtifact(createIsId(id));
  const edit = useTask(async (payload) => {
    await service.db.edit("artifacts", payload);
  });
  return { artifact, task };
}
