<script setup lang="ts">
import type { Artifact } from "@/domain";
import type { Tree } from "@/utils";

import { isObjectLike } from "@/utils";
import ProgressBar from "primevue/progressbar";
import PrimeVueTree from "primevue/tree";
import { computed, ref, watchEffect } from "vue";

import { ScrollPanel } from "../scroll-panel";
import { mapNode } from "./map-node";

const { artifacts } = defineProps<{
  artifacts: Tree<Artifact>;
  isLoading: boolean;
}>();
const emit = defineEmits<{
  selected: [id: typeof Artifact["id"]]
}>();

const value = computed(() => artifacts.map(mapNode));

const selectedKey = ref(null);
watchEffect(() => {
  if (!isObjectLike(selectedKey.value)) {
    emit("selected");
    return;
  }

  const keys = Object.keys(selectedKey.value);
  if (keys.length === 0) {
    emit("selected");
    return;
  }

  emit("selected", keys[0]);
});
</script>
<template>
  <div class="outline-artifacts">
    <ProgressBar
      v-if="isLoading"
      mode="indeterminate"
    />
    <ScrollPanel class="outline-artifacts-scroll">
      <PrimeVueTree
        v-model:selectionKeys="selectedKey"
        selection-mode="single"
        :value
      />
    </ScrollPanel>
  </div>
</template>
<style scoped>
.outline-artifacts,
.outline-artifacts-scroll {
  /* this will contain the component between the height boundaries of its parent  */
  height: 100%;
}

.outline-artifacts :deep(.p-progressbar) {
  border-radius: 0;
  height: var(--border-size-2);
}
</style>