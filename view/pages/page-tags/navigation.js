import { default as PageTags } from "./page-tags.vue";

const name = "page-tags";

export const tagsRoute = {
  path: `/${name}`,
  name,
  component: PageTags,
  meta: { intra: true },
};

export function goTags(dependencies) {
  const { router } = dependencies;
  return router.push({ name });
}
