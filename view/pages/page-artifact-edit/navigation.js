import { default as PageArtifactEdit } from "./page-artifact-edit.vue";

const name = "page-artifact-edit";

export const artifactEditRoute = {
  component: PageArtifactEdit,
  meta: { intra: true },
  name,
  path: `/${name}/:artifactId`,
  props: true,
};

export async function goArtifactEdit(dependencies, artifactId) {
  const { router } = dependencies;
  return router.push({ name, params: { artifactId } });
}
