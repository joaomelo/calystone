<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { Ascendancy } from "@/domain";
import { formatDateTime, PropertySheet, useI18n } from "@/utils";
import { computed } from "vue";

const { artifact } = defineProps<{
  artifact: TodoArtifact;
}>();

const { t } = useI18n();
const { nodes } = Store.use();
const ascendancy = new Ascendancy({ node: artifact, nodes });
const propertySheetRows = computed(() => {
  return [
    { label: t("path"), value: ascendancy.path() },
    { label: t("last-modified"), value: formatDateTime(new Date(artifact.lastModified)) },
    { label: t("editor-todo.progress.progress"), value: artifact.progress() },
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
