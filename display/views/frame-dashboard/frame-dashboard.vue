<script setup lang="ts">
import { type Activity } from "@domain";

import FrameDashboardSide from "./frame-dashboard-side.vue";

defineProps<{
  active: Activity
}>();
defineEmits<{
  "update:active": [active: Activity]
}>();
</script>
<template>
  <div class="frame-dashboard">
    <FrameDashboardSide
      :active="active"
      @update:active="$emit('update:active', $event)"
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
