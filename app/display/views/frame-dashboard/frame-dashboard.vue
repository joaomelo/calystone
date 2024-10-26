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
      :active="activity"
      @update:active="$emit('update:activity', $event)"
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
