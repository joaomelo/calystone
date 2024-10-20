<script setup>
import { isFinished } from "@body";
import { useI18n } from "@lib";
defineProps({
  artifact: {
    required: true,
    type: Object,
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
    {{ t(`shared.${artifact.status}`) }}
  </div>
</template>

<style scoped>
.item-status {
  font-size: var(--font-size-10);
  color: var(--color-content-30);
}
</style>
