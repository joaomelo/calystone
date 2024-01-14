<script setup>
import { addTag } from "@body";
import { ButtonBase, FormBase, InputText, useI18n, useTask } from "@lib";

const { t } = useI18n();

const reset = () => ({ name: null });
const { payload, task } = useTask((dependencies, payload) => addTag(dependencies, payload), reset);
</script>
<template>
  <form-base
    inline
    @submit="task.run"
  >
    <template #default>
      <input-text
        id="input-name"
        v-model="payload.name"
        autofocus
        :disabled="task.busy"
      />
    </template>
    <template #buttons>
      <button-base
        id="button-add"
        :busy="task.busy"
        :label="t('shared-actions.add')"
        type="submit"
      />
    </template>
  </form-base>
</template>
