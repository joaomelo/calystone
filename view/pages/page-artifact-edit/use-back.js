import { useDependencies } from "@lib";
import { goBack } from "@view";

export function useBack() {
  const dependencies = useDependencies();
  const back = () => goBack(dependencies);
  return back;
}
