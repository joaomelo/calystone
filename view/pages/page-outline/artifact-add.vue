<script setup>
import { ButtonBase, FormBase, InputText, useI18n } from "@lib";
import { useAddArtifact } from "./use-add";

const props = defineProps({
  parentId: {
    type: String,
    default: null,
  },
});

const { t } = useI18n();
const { task, payload } = useAddArtifact(props.parentId);
</script>
<template>
  <form-base inline @submit="task.run">
    <template #default>
      <input-text id="input-name" v-model="payload.name" autofocus />
    </template>
    <template #buttons>
      <button-base
        :busy="task.busy"
        :label="t('page-outline.add')"
        type="submit"
      />
    </template>
  </form-base>
</template>
