import { useService } from "@service";

export function useArtifacts() {
  const service = useService();
  const artifacts = service.db.select("artifacts");
  return artifacts;
}
