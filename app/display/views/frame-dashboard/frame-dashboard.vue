<script setup lang="ts">
import { Store } from "@/display/store";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import FrameDashboardSide from "./frame-dashboard-side.vue";

const router = useRouter();
const store = Store.use();

onBeforeMount(() => {
  if (!store.connected.value) {
    void router.push({ name: "open" });
  }
});
</script>
<template>
  <div class="frame-dashboard">
    <FrameDashboardSide />
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
.frame-dashboard {
  /* height is set to a fixed value so the vertical sidebar is always completly visible */
  height: 100dvh;
  /* overflow hidden will force child components to offer they vertical scroll */
  overflow: hidden;

  display: grid;
  grid-template-columns: auto 1fr;

  & main {
    height: 100%;
    overflow: hidden;
  }
}
</style>
