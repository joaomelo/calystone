<script setup>
import { watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useService, AUTH_STATUSES } from "@lib";
import { ROUTE_VISIBILITY, routesPaths } from "./router";

const auth = useService("auth");
const router = useRouter();
const route = useRoute();

let initialRoute = null;
let initialRedirected = false;

watch(
  [() => auth.user.status, () => route.meta.visibility],
  ([authStatus, routeVisibility]) => {
    if (!initialRoute && route.meta.visibility === ROUTE_VISIBILITY.INTERNAL)
      initialRoute = { ...route };

    if (authStatus === AUTH_STATUSES.UNSOLVED)
      return router.push(routesPaths.loading);

    if (
      authStatus === AUTH_STATUSES.SIGNED_OUT &&
      routeVisibility !== ROUTE_VISIBILITY.EXTERNAL
    )
      return router.push(routesPaths.auth);

    if (
      authStatus === AUTH_STATUSES.SIGNED_IN &&
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
