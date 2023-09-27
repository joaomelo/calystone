import { useService } from "@service";

export function useArtifacts(filter) {
  const service = useService();
  const artifacts = service.db.select("artifacts", filter);
  return artifacts;
}
