<script setup>
import { computed, toValue } from "vue";
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
  const { id, name: current } = toValue(props.artifact);
  if (name === current) return;
  editArtifact(dependencies, { id, name });
};
const handleBlur = (e) => {
  const text = e.target.textContent;
  edit(text);
};
const handleEnter = (e) => e.target.blur();
</script>

<template>
  <div
    class="outline-item-name"
    :class="{ finished }"
    contenteditable="plaintext-only"
    @blur="handleBlur"
    @keydown.enter.prevent="handleEnter"
  >
    {{ artifact.name }}
  </div>
</template>

<style scoped>
.outline-item-name {
  flex-grow: 1;
  outline: none;
}

.outline-item-name.finished {
  color: var(--color-content-50);
  text-decoration: line-through;
}
</style>
