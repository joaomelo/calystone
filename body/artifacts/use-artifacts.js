import { useSelect } from "@lib";

export function useArtifacts() {
  return useSelect("artifacts");
}
