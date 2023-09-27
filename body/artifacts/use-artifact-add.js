import { useTask } from "@shared";
import { useService } from "@service";

export function useArtifactAdd() {
  const service = useService();

  const { task } = useTask(async (payload) => {
    await service.db.add("artifacts", payload);
  });
  return task;
}
