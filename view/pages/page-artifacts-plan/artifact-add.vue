<script setup>
import { ButtonBase, InputBase, useI18n } from "@lib";
import { useCase } from "@pilot";

const { t } = useI18n();
const { task, payload } = useCase("artifactAddCase");
</script>
<template>
  <div class="artifact-add">
    <input-base v-model="payload.name" />
    <button-base
      :busy="task.busy"
      :label="t('page-artifacts-plan.add')"
      @click="task.run"
    />
  </div>
</template>
<style scoped>
.artifact-add {
  display: flex;
  justify-content: space-between;
  gap: var(--size-00);
}
</style>
