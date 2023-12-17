import { default as PagePreferences } from "./page-preferences.vue";

const name = "page-preferences";

export const preferencesRoute = {
  path: `/${name}`,
  name,
  component: PagePreferences,
  meta: { intra: true },
};

export function isPreferences(dependencies) {
  const { router } = dependencies;
  return router.currentRoute.value.name === name;
}

export function goPreferences(dependencies) {
  const { router } = dependencies;
  return router.push({ name });
}
