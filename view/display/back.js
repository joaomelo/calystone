import { goOutline } from "@view/pages";

export function goBack(dependencies) {
  const { router } = dependencies;

  const backPath = router.options.history.state.back;
  const backRoute = router.resolve(backPath);

  return backRoute.meta.intra ? router.back() : goOutline(dependencies);
}
