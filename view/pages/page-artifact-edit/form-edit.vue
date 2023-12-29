<script setup>
import {
  ButtonBase,
  FormBase,
  InputDate,
  InputRich,
  InputText,
  useI18n,
} from "@lib";
import { useEdit } from "./use-edit";

const props = defineProps({
  artifactId: {
    type: String,
    required: true,
  },
});

const { t } = useI18n();
const { save, back, payload } = useEdit(props.artifactId);
</script>
<template>
  <form-base :error="save.error" @submit="save.run">
    <template #default>
      <input-text
        id="input-name"
        v-model="payload.name"
        :label="t('page-artifact-edit.name')"
        autofocus
      />
      <input-date
        id="input-date-start"
        v-model="payload.dateStart"
        :label="t('page-artifact-edit.date-start')"
      />
      <input-date
        id="input-date-end"
        v-model="payload.dateEnd"
        :label="t('page-artifact-edit.date-end')"
      />
      <input-rich
        id="input-notes"
        v-model="payload.notes"
        :label="t('page-artifact-edit.notes')"
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
