import { useDependencies } from "@lib";
import { isOutline as isOutlineBase, goOutline as goOutlineBase } from "@view";

export function useOutline() {
  const dependencies = useDependencies();
  const isOutline = () => isOutlineBase(dependencies);
  const goOutline = () => goOutlineBase(dependencies);
  return { isOutline, goOutline };
}
