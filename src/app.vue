<script setup>
// import { watch } from "vue";
// import { useRouter } from "vue-router";

// import { routesPaths } from "./router";
// import { store } from "./store";

// const router = useRouter();

// watch(
//   () => store.auth.status,
//   (status) => {
//     switch (status) {
//       case "IDLE":
//         return router.push(routesPaths.initial);
//       case STATUSES.PLAYING:
//         return router.push(routesPaths.playing);
//       case STATUSES.WIN:
//         return router.push(routesPaths.win);
//       case STATUSES.LOST:
//         return router.push(routesPaths.lost);
//       default:
//         return router.push(routesPaths.initial);
//     }
//   }
// );
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
  background-color: var(--color-50);
}
</style>
