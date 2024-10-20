import { default as PagePreferences } from "./page-preferences.vue";

const name = "page-preferences";

export const preferencesRoute = {
  component: PagePreferences,
  meta: { intra: true },
  name,
  path: `/${name}`,
};

export function isPreferences(dependencies) {
  const { router } = dependencies;
  return router.currentRoute.value.name === name;
}

export function goPreferences(dependencies) {
  const { router } = dependencies;
  return router.push({ name });
}
