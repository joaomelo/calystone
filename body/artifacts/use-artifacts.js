import { useService } from "@lib";

export function useArtifacts() {
  const artifactsDataset = useService("artifacts");
  return artifactsDataset.items;
}
