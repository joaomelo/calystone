import { useArtifacts } from "@body";

export function useClose() {
  return () => {
    const artifacts = useArtifacts();
    artifacts.close();
  };
}
