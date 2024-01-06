<script setup>
import { ButtonBase, FormBase, InputText, useI18n, useTask } from "@lib";
import { addTag } from "@body";

const { t } = useI18n();

const reset = () => ({ name: null });
const { task, payload } = useTask((dependencies, payload) => addTag(dependencies, payload.name), reset);
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
        :label="t('page-tags.add')"
        type="submit"
      />
    </template>
  </form-base>
</template>
