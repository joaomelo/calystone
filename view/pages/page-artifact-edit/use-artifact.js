import { createIsId } from "@body";
import { useStore } from "@view/store";

export function useArtifact(id) {
  const { artifacts } = useStore();
  return artifacts.selectOne(createIsId(id));
}
