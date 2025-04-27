<script setup lang="ts">
import { kebabCase } from "@/utils/text/kebab-case";

import ChipTag from "./chip-tag.vue";

const { removable = false } = defineProps<{
  dataTest: string
  labels: string[],
  removable?: boolean,
}>();
defineEmits<{
  remove: [label: string];
}>();
</script>
<template>
  <div
    class="chip-tags"
    :data-test="dataTest"
  >
    <ChipTag
      v-for="label in labels"
      :key="label"
      data-test-type="chip-tag"
      :data-test="`${kebabCase(dataTest)}-${label}`"
      :label="label"
      :removable="removable"
      @remove="$emit('remove', label)"
    />
  </div>
</template>
<style scoped>
.chip-tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--size-2);
}
</style>
