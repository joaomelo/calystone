<script setup lang="ts">
import { type Activity } from "@/display/activities";

import FrameDashboardSide from "./frame-dashboard-side.vue";

defineProps<{
  activity: Activity
}>();
defineEmits<{
  "update:activity": [activity: Activity]
}>();
</script>
<template>
  <div class="frame-dashboard">
    <FrameDashboardSide
      :activity="activity"
      @update:activity="$emit('update:activity', $event)"
    />
    <main class="frame-dashboard-main">
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

.frame-dashboard-main {
  /* no scrolling configuration is set to allow router views to decide de best strategy */
  max-height: 100vh;
}
</style>
