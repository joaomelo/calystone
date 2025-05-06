<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { PropertySheet, useI18n } from "@/utils";
import { computed } from "vue";

const { artifact } = defineProps<{
  artifact: TodoArtifact;
}>();

const { d, t } = useI18n();

const propertySheetRows = computed(() => {
  return [
    { label: t("path"), value: artifact.mountPath() },
    { label: t("last-modified"), value: d(new Date(artifact.lastModified)) },
  ];
});
</script>
<template>
  <div class="control-info">
    <PropertySheet :rows="propertySheetRows" />
  </div>
</template>
<style scoped>
.control-info {
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}
</style>
