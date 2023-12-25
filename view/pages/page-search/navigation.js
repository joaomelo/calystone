import { default as PageSearch } from "./page-search.vue";

const name = "page-search";

export const searchRoute = {
  path: `/${name}`,
  name,
  component: PageSearch,
  meta: { intra: true },
  props: (route) => ({ term: route.query.term }),
};

export function isSearch(dependencies) {
  const { router } = dependencies;
  return router.currentRoute.value.name === name;
}

export function goSearch(dependencies, term) {
  const { router } = dependencies;
  return router.push({ name, query: { term } });
}