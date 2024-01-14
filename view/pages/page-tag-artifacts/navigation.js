import { default as PageTagArtifacts } from "./page-tag-artifacts.vue";

const name = "page-tag-artifacts";

export const tagArtifactsRoute = {
  component: PageTagArtifacts,
  meta: { intra: true },
  name,
  path: `/${name}/:tagId`,
  props: true,
};

export function goTagArtifacts(dependencies, tagId) {
  const { router } = dependencies;
  return router.push({ name, params: { tagId } });
}
