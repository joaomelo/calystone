export function goBack({ router }) {
  return router.back();
}

export function goPageAuth({ router }) {
  return router.push({ name: "page-auth" });
}

export function goPageOutline({ router }) {
  return router.push({ name: "page-outline" });
}

export function goPagePreferences({ router }) {
  return router.push({ name: "page-preferences" });
}

export function goPageSearch({ router }, { term } = {}) {
  return router.push({ name: "page-search", query: { term } });
}

export function goPageArtifactEdit({ router }, artifactId) {
  return router.push({
    name: "page-artifact-edit",
    params: { artifactId },
  });
}
