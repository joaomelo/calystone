import { useService } from "@service";

export function useArtifact(find) {
  const service = useService();
  const artifact = service.db.selectOne("artifacts", find);
  return artifact;
}
