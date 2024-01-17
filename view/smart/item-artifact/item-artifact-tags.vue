<script setup>
import { listTagsOf } from "@body";
import { ChipBase, useDependencies } from "@lib";
import { goTagArtifacts } from "@view";
import { computed } from "vue";

const props = defineProps({
  artifact: {
    required: true,
    type: Object,
  },
});

const dependencies = useDependencies();
const tags = computed(() => listTagsOf(dependencies, props.artifact.id));

const handleClick = id => goTagArtifacts(dependencies, id);
</script>

<template>
  <div class="item-artifact-tags">
    <chip-base
      v-for="tag in tags"
      :key="tag.id"
      :text="tag.name"
      :data-test="`tag-${tag.name}`"
      @click="handleClick(tag.id)"
    />
  </div>
</template>

<style scoped>
.item-artifact-tags {
  display: flex;
  gap: var(--size-05);
}
</style>
