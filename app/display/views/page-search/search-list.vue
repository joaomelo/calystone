<script setup>
import { searchArtifacts } from "@/body";
import { ListBase, truncate, useDependencies } from "@/lib";
import { computed } from "vue";

const props = defineProps({
  term: {
    default: null,
    type: String,
  },
});

const dependencies = useDependencies();
const searched = computed(() => {
  const searched = searchArtifacts(dependencies, props.term);
  return searched.map(({ id, notes }) => ({
    tooltip: truncate(notes, 100),
    value: id,
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
