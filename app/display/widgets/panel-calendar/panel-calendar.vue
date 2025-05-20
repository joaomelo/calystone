<script setup lang="ts">
import { ScrollPanel } from "@/utils";

defineEmits<{
  "selected": [id: Node | undefined]
}>();
</script>
<template>
  <ScrollPanel>
    <div class="panel-calendar">
      under development
    </div>
  </ScrollPanel>
</template>
<style scoped>
.panel-calendar {
  padding: var(--size-3);
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}
</style>
