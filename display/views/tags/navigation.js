import { default as PageTags } from "./page-tags.vue";

const name = "page-tags";

export const tagsRoute = {
  component: PageTags,
  meta: { intra: true },
  name,
  path: `/${name}`,
};

export function goTags(dependencies) {
  const { router } = dependencies;
  return router.push({ name });
}
