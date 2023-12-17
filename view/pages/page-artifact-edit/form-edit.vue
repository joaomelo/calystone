<script setup>
import { FormBase, InputBase, ButtonBase, useI18n } from "@lib";
import { useBack } from "./use-back";
import { useEdit } from "./use-edit";

const props = defineProps({
  artifactId: {
    type: String,
    required: true,
  },
});

const { t } = useI18n();
const back = useBack();
const { save, payload } = useEdit(props.artifactId, back);
</script>
<template>
  <form-base :error="save.error" @submit="save.run">
    <template #default>
      <input-base
        v-model="payload.name"
        :label="t('page-artifact-edit.name')"
      />
      <input-base
        v-model="payload.notes"
        :label="t('page-artifact-edit.notes')"
        type="textarea"
        rows="20"
      />
    </template>
    <template #buttons>
      <button-base
        type="submit"
        :label="t('page-artifact-edit.save')"
        :busy="save.busy"
      />
      <button-base :label="t('page-artifact-edit.cancel')" @click="back" />
    </template>
  </form-base>
</template>
