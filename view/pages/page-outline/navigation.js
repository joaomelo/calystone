import { default as PageOutline } from "./page-outline.vue";

const name = "page-outline";

export const outlineRoute = {
  path: `/${name}/:parentId?`,
  name,
  component: PageOutline,
  props: true,
  meta: { intra: true },
};

export function isOutline(dependencies) {
  const { router } = dependencies;
  return router.currentRoute.value.name === name;
}

export function goOutline(dependencies, parentId = null) {
  const { router } = dependencies;
  return router.push({ name }, { params: { parentId } });
}
