<script setup>
import { watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useGlobalStateful } from "../lib";
import { AUTH_STATUSES } from "../body";
import { ROUTE_VISIBILITY, routesPaths } from "./router";

const authStatus = useGlobalStateful((auth) => auth.status);
const router = useRouter();
const route = useRoute();

let initialRoute = null;
let initialRedirected = false;

watch(
  [() => authStatus.value, () => route.meta.visibility],
  ([authStatusValue, routeVisibility]) => {
    if (!initialRoute && route.meta.visibility === ROUTE_VISIBILITY.INTERNAL)
      initialRoute = { ...route };

    if (authStatusValue === AUTH_STATUSES.UNSOLVED)
      return router.push(routesPaths.loading);

    if (
      authStatusValue === AUTH_STATUSES.SIGNED_OUT &&
      routeVisibility !== ROUTE_VISIBILITY.EXTERNAL
    )
      return router.push(routesPaths.auth);

    if (
      authStatusValue === AUTH_STATUSES.SIGNED_IN &&
      routeVisibility !== ROUTE_VISIBILITY.INTERNAL
    ) {
      if (initialRedirected || !initialRoute)
        return router.push(routesPaths.programs);

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
