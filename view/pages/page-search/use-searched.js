import { computed } from "vue";
import { useDependencies, truncate } from "@lib";
import { searchArtifacts } from "@body";

export function useSearched(actions, term) {
  const dependencies = useDependencies();
  const list = computed(() => {
    const searched = searchArtifacts(dependencies, term.value);
    return searched.map(({ id, name, notes }) => ({
      value: id,
      text: name,
      tooltip: truncate(notes, 100),
      actions,
    }));
  });
  return list;
}
