<script setup>
import { computed } from "vue";
import { useDependencies } from "@lib";
import { getArtifact } from "@body";
import OutlineItemActions from "./outline-item-actions.vue";
import OutlineItemDates from "./outline-item-dates.vue";
import OutlineItemName from "./outline-item-name.vue";
import OutlineItemStatus from "./outline-item-status.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const dependencies = useDependencies();
const artifact = computed(() => getArtifact(dependencies, props.id));
</script>

<template>
  <div class="outline-item">
    <outline-item-name :artifact="artifact" />
    <outline-item-status :artifact="artifact" />
    <outline-item-dates :artifact="artifact" />
    <outline-item-actions :artifact="artifact" />
  </div>
</template>

<style scoped>
.outline-item {
  display: flex;
  align-items: baseline;
  gap: var(--size-15);
}
</style>
