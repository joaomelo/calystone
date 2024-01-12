<script setup>
import { listTagsOf } from "@body";
import { ChipBase, useDependencies } from "@lib";
import { computed } from "vue";

const props = defineProps({
  artifact: {
    required: true,
    type: Object,
  },
});

const dependencies = useDependencies();

const tags = computed(() => listTagsOf(dependencies, props.artifact.id));
</script>

<template>
  <chip-base
    v-for="tag in tags"
    :key="tag.id"
    :text="tag.name"
  />
</template>

<style scoped>
.item-status {
  font-size: var(--font-size-10);
  color: var(--color-content-30);
}
</style>
