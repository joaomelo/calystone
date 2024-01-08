<script setup>
import { getArtifact } from "@body";
import { ActionsMenu, useDependencies } from "@lib";
import { computed } from "vue";

import ItemDates from "./item-dates.vue";
import ItemName from "./item-name.vue";
import ItemStatus from "./item-status.vue";

const props = defineProps({
  id: {
    required: true,
    type: String,
  },
});

const dependencies = useDependencies();
const artifact = computed(() => getArtifact(dependencies, props.id));
</script>

<template>
  <div class="artifact-item">
    <item-name :artifact="artifact" />
    <item-dates :artifact="artifact" />
    <item-status :artifact="artifact" />
    <actions-menu>
      <slot
        name="actions"
        v-bind="artifact"
      />
    </actions-menu>
  </div>
</template>

<style scoped>
.artifact-item {
  display: flex;
  align-items: baseline;
  gap: var(--size-15);
}
</style>
