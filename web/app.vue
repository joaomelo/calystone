<script setup>
import { watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStatus } from "@body";
import { ROUTE_VISIBILITY, routesPaths } from "./router";

const authStatus = useAuthStatus();
const router = useRouter();
const route = useRoute();

let initialRoute = null;
let initialRedirected = false;

watch(
  [() => route.meta.visibility, () => authStatus.status],
  async ([routeVisibility]) => {
    if (!initialRoute && route.meta.visibility === ROUTE_VISIBILITY.INTERNAL)
      initialRoute = { ...route };

    if (authStatus.isUnsolved) return router.push({ name: "loadingAuth" });

    if (authStatus.isSignedOut && routeVisibility !== ROUTE_VISIBILITY.EXTERNAL)
      return router.push({ name: "auth" });

    if (
      authStatus.isSignedIn &&
      routeVisibility !== ROUTE_VISIBILITY.INTERNAL
    ) {
      const initialPath =
        initialRedirected || !initialRoute
          ? routesPaths.artifactsPlan
          : initialRoute.fullPath;
      initialRedirected = true;

      router.push({
        name: "loadingDatasets",
        params: { redirect: initialPath },
      });
    }
  }
);
</script>

<template>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
main {
  max-width: var(--size-90);
  height: 100%;
  margin: auto;
  padding-block: var(--size-20);
  padding-inline: var(--size-20);
  background-color: var(--color-neutral-70);
}
</style>
