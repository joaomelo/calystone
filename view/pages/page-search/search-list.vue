<script setup>
import { computed } from "vue";
import { ListBase, truncate, useDependencies } from "@lib";
import { searchArtifacts } from "@body";

const props = defineProps({
  term: {
    type: String,
    default: null,
  },
});

const dependencies = useDependencies();
const searched = computed(() => {
  const searched = searchArtifacts(dependencies, props.term);
  return searched.map(({ id, notes }) => ({
    value: id,
    tooltip: truncate(notes, 100),
  }));
});
</script>
<template>
  <list-base :items="searched">
    <template #item="slotProps">
      <slot
        name="item"
        v-bind="slotProps"
      />
    </template>
  </list-base>
</template>
