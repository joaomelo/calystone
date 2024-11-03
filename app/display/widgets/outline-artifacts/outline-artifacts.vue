<script setup lang="ts">
import type { Artifact } from "@/domain";
import type { Id } from "@/utils";

import { isId, isObjectLike } from "@/utils";
import ProgressBar from "primevue/progressbar";
import PrimeVueTree from "primevue/tree";
import { computed, ref, watchEffect } from "vue";

import { ScrollPanel } from "../scroll-panel";
import { convert } from "./convert";

const { artifacts } = defineProps<{
  artifacts: Artifact[];
  isLoading: boolean;
}>();
const emit = defineEmits<{
  selected: [id: Id | undefined];
}>();

const value = computed(() => artifacts.map(convert));

const selectedKey = ref(null);
watchEffect(() => {
  if (!isObjectLike(selectedKey.value)) {
    emit("selected", undefined);
    return;
  }

  const keys = Object.keys(selectedKey.value);
  if (!isId(keys[0])) {
    emit("selected", undefined);
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