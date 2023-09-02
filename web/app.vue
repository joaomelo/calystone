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
  ([routeVisibility]) => {
    if (!initialRoute && route.meta.visibility === ROUTE_VISIBILITY.INTERNAL)
      initialRoute = { ...route };

    if (authStatus.isUnsolved) return router.push(routesPaths.loading);

    if (authStatus.isSignedOut && routeVisibility !== ROUTE_VISIBILITY.EXTERNAL)
      return router.push(routesPaths.auth);

    if (
      authStatus.isSignedIn &&
      routeVisibility !== ROUTE_VISIBILITY.INTERNAL
    ) {
      if (initialRedirected || !initialRoute)
        return router.push(routesPaths.artifactsPlan);

      initialRedirected = true;
      return router.push(initialRoute.fullPath);
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
