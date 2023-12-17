import { computed } from "vue";
import { useDependencies } from "@lib";
import { searchArtifacts } from "@body";

export function useSearched(actions, term) {
  const dependencies = useDependencies();
  const list = computed(() => {
    const searched = searchArtifacts(dependencies, term.value);
    return searched.map(({ id, name }) => ({
      value: id,
      text: name,
      actions,
    }));
  });
  return list;
}
