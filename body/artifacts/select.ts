import type { Predicate } from "@shared";
import { useSelect } from "@service";

export function useArtifacts(predicate: Predicate) {
  const artifactsSelect = useSelect("artifacts");
  const artifacts = artifactsSelect.filter(predicate);
  return artifacts;
}

export function useArtifact(predicate: Predicate) {
  const artifactsSelect = useSelect("artifacts");
  const artifact = artifactsSelect.find(predicate);
  return artifact;
}
