<script setup lang="ts">
import type { Activity } from "@/display/activities";

import { Store } from "@/display";
import { ACTIVITIES, useCurrentActivity } from "@/display/activities";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";

import FrameDashboardSide from "./frame-dashboard-side.vue";

const router = useRouter();
const { nodes } = Store.use();
const currentActivity = useCurrentActivity();

watchEffect(() => {
  if (!nodes.connection) {
    void router.push({ name: ACTIVITIES.OPEN });
  }
});

function handleUpdateActivity(newActivity: Activity) {
  if (newActivity === ACTIVITIES.OPEN) {
    nodes.disconnect();
    return;
  }
  void router.push({ name: newActivity });
}
</script>
<template>
  <div class="frame-dashboard">
    <FrameDashboardSide
      :activity="currentActivity"
      @update:activity="handleUpdateActivity"
    />
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
