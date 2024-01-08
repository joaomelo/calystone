<script setup>
import { listTags } from "@body";
import { ListBase, sort, useDependencies } from "@lib";
import { computed } from "vue";

defineProps({
  parentId: {
    default: null,
    type: String,
  },
});

const dependencies = useDependencies();

const items = computed(() => {
  const tags = listTags(dependencies);
  const sorted = sort(tags, "order");
  const items = sorted.map(({ id }) => ({ value: id }));
  return items;
});
</script>
<template>
  <list-base
    :items="items"
  >
    <template #item="slotProps">
      <slot
        name="item"
        v-bind="slotProps"
      />
    </template>
  </list-base>
</template>
