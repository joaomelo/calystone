<script setup>
import { watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useReadiness, READINESS } from "@body";
import { useT, useFirebase } from "@lib";
import { PageUnloaded, PageUnsolved, PageAuth } from "./pages";

const readiness = useReadiness();
const firebase = useFirebase();

// const t = useT();
// const auth = useService("auth");
// const router = useRouter();
// const route = useRoute();

// let initialPath = null;

// watch([() => route, () => auth.user.status], async ([route, authStatus]) => {
//   if (!initialPath && route.meta.entry) {
//     console.info(`saving initial route path to ${route.fullPath}`);
//     initialPath = route.fullPath;
//   }

//   if (
//     authStatus === AUTH_STATUSES.SIGNED_OUT &&
//     route.meta.visibility !== ROUTE_VISIBILITY.EXTERNAL
//   ) {
//     console.info("user is not authenticated. redirecting to auth page");
//     return router.push({ name: "auth" });
//   }

//   if (authStatus.isSignedIn && routeVisibility !== ROUTE_VISIBILITY.INTERNAL) {
//   const initialPath =
//     initialRedirected || !initialPath
//       ? routesPaths.artifactsPlan
//       : initialPath.fullPath;
//   initialRedirected = true;
//   router.push({
//     name: "loadingDatasets",
//     params: { redirect: initialPath },
//   });
// }
// });
</script>

<template>
  <main>
    <template v-if="readiness === READINESS.UNSOLVED">
      <page-unsolved />
    </template>
    <template v-if="readiness === READINESS.OUT">
      <page-auth />
    </template>
    <template v-if="readiness === READINESS.UNLOADED">
      <page-unloaded />
    </template>
    <template v-else>todo</template>
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
