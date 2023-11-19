<script setup>
import { reactive } from "vue";
import { ButtonBase, InputBase, useI18n, useTask } from "@lib";
import { usePilot } from "@body";

const { t } = useI18n();
const pilot = usePilot();

const payload = reactive({ name: null });
const add = useTask(async () => {
  await pilot.addArtifact(payload);
  payload.name = null;
});
</script>
<template>
  <div class="artifact-add">
    <input-base v-model="payload.name" />
    <button-base
      :busy="add.busy"
      :label="t('page-artifacts-plan.add')"
      @click="add.run"
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
