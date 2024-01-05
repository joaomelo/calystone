<script setup>
import {
  ButtonBase,
  FormBase,
  InputDate,
  InputRich,
  InputsPanel,
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
  <form-base
    :error="save.error"
    @submit="save.run"
  >
    <template #default>
      <input-text
        id="input-name"
        v-model="payload.name"
        :label="t('page-artifact-edit.name')"
        autofocus
      />
      <inputs-panel>
        <input-date
          id="input-start"
          v-model="payload.start"
          :label="t('page-artifact-edit.date-start')"
        />
        <input-date
          id="input-end"
          v-model="payload.end"
          :label="t('page-artifact-edit.date-end')"
        />
      </inputs-panel>
      <input-rich
        id="input-notes"
        v-model="payload.notes"
        :label="t('page-artifact-edit.notes')"
      />
    </template>
    <template #buttons>
      <button-base
        id="button-save"
        type="submit"
        :label="t('page-artifact-edit.save')"
        :busy="save.busy"
      />
      <button-base
        id="button-cancel"
        :label="t('page-artifact-edit.cancel')"
        @click="back"
      />
    </template>
  </form-base>
</template>
