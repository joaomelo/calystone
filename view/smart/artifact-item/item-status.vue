<script setup>
import { useI18n } from "@lib";
import { isFinished } from "@body";
defineProps({
  artifact: {
    type: Object,
    required: true,
  },
});
const { t } = useI18n();
</script>

<template>
  <div
    v-if="isFinished(artifact)"
    class="item-status"
    :class="artifact.status"
  >
    {{ t(`artifact-item.${artifact.status}`) }}
  </div>
</template>

<style scoped>
.item-status {
  font-size: var(--font-size-10);
  color: var(--color-content-30);
}
</style>
