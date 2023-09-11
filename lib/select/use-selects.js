import { useSelect } from "./use-select";

export function useSelects(names) {
  return names.map((name) => useSelect(name));
}
