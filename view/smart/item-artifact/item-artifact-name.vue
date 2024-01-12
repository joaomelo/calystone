<script setup>
import { editArtifact, isFinished } from "@body";
import { InputCamo, useDependencies } from "@lib";
import { computed } from "vue";

const props = defineProps({
  artifact: {
    required: true,
    type: Object,
  },
});

const dependencies = useDependencies();

const finished = computed(() => isFinished(props.artifact));
const handleUpdate = (name) => {
  const { id, name: current } = props.artifact;
  if (name === current) return;
  editArtifact(dependencies, { id, name });
};
</script>

<template>
  <input-camo
    class="item-name"
    :class="{ finished }"
    :model-value="artifact.name"
    @update:model-value="handleUpdate"
  />
</template>

<style scoped>
.item-name.finished {
  color: var(--color-content-50);
  text-decoration: line-through;
}
</style>
