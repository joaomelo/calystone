<script setup>
import { computed } from "vue";
import { useDependencies } from "@lib";
import { editArtifact, isFinished } from "@body";

const props = defineProps({
  artifact: {
    type: Object,
    required: true,
  },
});

const dependencies = useDependencies();

const finished = computed(() => isFinished(props.artifact));

const edit = (name) => {
  const { id, name: current } = props.artifact;
  if (name === current) return;
  editArtifact(dependencies, { id, name });
};
const handleBlur = (e) => {
  const text = e.target.textContent;
  edit(text);
};
const handleEnter = e => e.target.blur();
</script>

<template>
  <div
    class="item-name"
    :class="{ finished }"
    contenteditable="plaintext-only"
    @blur="handleBlur"
    @keydown.enter.prevent="handleEnter"
  >
    {{ artifact.name }}
  </div>
</template>

<style scoped>
.item-name {
  flex-grow: 1;
  outline: none;
}

.item-name.finished {
  color: var(--color-content-50);
  text-decoration: line-through;
}
</style>
