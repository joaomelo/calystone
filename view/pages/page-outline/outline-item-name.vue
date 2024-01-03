<script setup>
import { toValue } from "vue";
import { useDependencies } from "@lib";
import { editArtifact } from "@body";

const props = defineProps({
  artifact: {
    type: Object,
    required: true,
  },
});

const dependencies = useDependencies();

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
</style>
