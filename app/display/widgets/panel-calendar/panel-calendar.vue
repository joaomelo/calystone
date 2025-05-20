<script setup lang="ts">
import { MonthViewer } from "@/utils";

defineEmits<{
  "selected": [id: Node | undefined]
}>();
</script>
<template>
  <div class="panel-calendar">
    <MonthViewer />
    <div>day schedule</div>
  </div>
</template>
<style scoped>
.panel-calendar {
  padding: var(--size-3);
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}
</style>
