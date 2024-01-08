import { default as PageOutline } from "./page-outline.vue";

const name = "page-outline";

export const outlineRoute = {
  component: PageOutline,
  meta: { intra: true },
  name,
  path: `/${name}/:parentId?`,
  props: true,
};

export function isOutline(dependencies) {
  const { router } = dependencies;
  return router.currentRoute.value.name === name;
}

export function goOutline(dependencies, parentId = null) {
  const { router } = dependencies;
  return router.push({ name, params: { parentId: parentId } });
}
