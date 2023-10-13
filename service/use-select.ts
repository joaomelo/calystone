import type { CollectionName } from "./collections";
import { useService } from "./use-service";

export function useSelect(name: CollectionName) {
  const service = useService();
  const select = service.getSelect(name);
  return select;
}
