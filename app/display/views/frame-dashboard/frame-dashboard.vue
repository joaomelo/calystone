<script setup lang="ts">
import { activities } from "@/display/activities";
import { Store } from "@/display/store";
import { watch } from "vue";
import { useRouter } from "vue-router";

import FrameDashboardSide from "./frame-dashboard-side.vue";

const router = useRouter();
const state = Store.use();

watch(
  () => state.nodes.repository,
  (hasRepository) => {
    if (!hasRepository) {
      void router.push({ name: activities.open });
    }
  },
  {
    immediate: true
  }
);

</script>
<template>
  <div class="frame-dashboard">
    <FrameDashboardSide />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.frame-dashboard {
  height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  overflow: hidden;
}
</style>
