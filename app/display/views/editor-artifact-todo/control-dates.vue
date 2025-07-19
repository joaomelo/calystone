<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import ControlDatesClear from "./control-dates-clear.vue";
import ControlDatesRecurrence from "./control-dates-recurrence.vue";
import ControlDatesStartDue from "./control-dates-start-due.vue";

const { artifact } = defineProps<{ artifact: TodoArtifact }>();
</script>
<template>
  <div class="control-dates">
    <ControlDatesStartDue :artifact="artifact" />
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