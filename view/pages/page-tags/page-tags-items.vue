<script setup>
import { listTags } from "@body";
import { ListBase, useDependencies } from "@lib";
import { computed } from "vue";

import { useHandleDrag } from "./use-handle-drag";

defineProps({
  parentId: {
    default: null,
    type: String,
  },
});

const dependencies = useDependencies();
const items = computed(() => listTags(dependencies)
  .map(({ id }) => ({ value: id })));

const handleDrag = useHandleDrag();
</script>
<template>
  <list-base
    :items="items"
    :draggable="{ top: true, bottom: true, middle: false }"
    @drag="handleDrag"
  >
    <template #item="slotProps">
      <slot
        name="item"
        v-bind="slotProps"
      />
    </template>
  </list-base>
</template>
