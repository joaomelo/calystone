<script setup>
import { listTags } from "@body";
import { ListBase, useDependencies } from "@lib";
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
  const items = tags.map(({ id }) => ({ value: id }));
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
