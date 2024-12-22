<script setup lang="ts">
import { activities } from "@/display/activities";
import { State } from "@/display/state";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";

import FrameDashboardSide from "./frame-dashboard-side.vue";

const router = useRouter();
const { nodes } = State.use();

watchEffect(() => {
  if (!nodes.value) {
    void router.push({ name: activities.open });
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
