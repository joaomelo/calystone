<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { LinkNodePath } from "@/display/views/link-node-path";
import {
  formatDateTime,
  PropertySheet,
  useI18n
} from "@/utils";
import { computed } from "vue";

const { artifact } = defineProps<{ artifact: TodoArtifact; }>();

const { t } = useI18n();

const { services } = Store.use();
const hierarchy = services.spawnHierarchy.spawn();

const propertySheetRows = computed(() => {
  return [
    {
      key: "path",
      label: t("path"),
      value: hierarchy.path(artifact)
    },
    {
      key: "last-modified",
      label: t("last-modified"),
      value: formatDateTime(new Date(artifact.lastModified))
    },
  ];
});
</script>
<template>
  <div class="control-info">
    <PropertySheet :rows="propertySheetRows">
      <template #value-path="{ row }">
        <LinkNodePath
          :id="artifact.id"
          :path="row.value.toString()"
        />
      </template>
    </PropertySheet>
  </div>
</template>
<style scoped>
.control-info {
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}
</style>
