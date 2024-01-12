<script setup>
import { ButtonBase, FormBase, InputDate, InputRich, InputText, PanelResponsive, useI18n } from "@lib";

import { useEdit } from "./use-edit";

const props = defineProps({
  artifactId: {
    required: true,
    type: String,
  },
});

const { t } = useI18n();
const { back, payload, save } = useEdit(props.artifactId);
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
      <panel-responsive>
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
      </panel-responsive>
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
        :label="t('shared-actions.save')"
        :busy="save.busy"
      />
      <button-base
        id="button-cancel"
        :label="t('shared-actions.cancel')"
        @click="back"
      />
    </template>
  </form-base>
</template>
