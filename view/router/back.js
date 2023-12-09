export function goBack(dependencies) {
  const { router } = dependencies;
  return router.back();
}
