<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import ControlDatesClear from "./control-dates-clear.vue";
import ControlDatesRecurrence from "./control-dates-recurrence.vue";
import ControlDatesStartEnd from "./control-dates-start-end.vue";

const { artifact } = defineProps<{ artifact: TodoArtifact }>();
</script>
<template>
  <div class="control-dates">
    <ControlDatesStartEnd :artifact="artifact" />
    <ControlDatesRecurrence :artifact="artifact" />
    <ControlDatesClear :artifact="artifact" />
  </div>
</template>
<style scoped>
.control-dates {
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}
</style>