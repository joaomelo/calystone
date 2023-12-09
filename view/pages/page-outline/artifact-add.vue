<script setup>
import { ButtonBase, InputBase, useI18n } from "@lib";
import { useAddArtifact } from "./use-add";

const props = defineProps({
  parentId: {
    type: String,
    default: null,
  },
});

const { t } = useI18n();
const { useCase, payload } = useAddArtifact(props.parentId);
</script>
<template>
  <div class="artifact-add">
    <input-base v-model="payload.name" />
    <button-base
      :busy="useCase.busy"
      :label="t('page-outline.add')"
      @click="useCase.run"
    />
  </div>
</template>
<style scoped>
.artifact-add {
  display: flex;
  justify-content: space-between;
  gap: var(--size-15);
}
</style>
