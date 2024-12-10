<script setup lang="ts">
import { Store } from "@/display";
import { ACTIVITIES } from "@/display/activities";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";

import FrameDashboardSide from "./frame-dashboard-side.vue";

const router = useRouter();
const { nodes } = Store.use();

watchEffect(() => {
  if (!nodes.connection) {
    void router.push({ name: ACTIVITIES.OPEN });
  }
});

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
