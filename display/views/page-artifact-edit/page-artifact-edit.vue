<script setup>
import { editArtifact, getArtifact } from "@body";
import { ButtonBase, FormBase, InputDate, InputRich, InputText, PanelResponsive, useDependencies, useI18n, useTask } from "@lib";
import { goBack } from "@view";
import { FrameDashboard } from "@view/smart";

const props = defineProps({
  artifactId: {
    required: true,
    type: String,
  },
});

const { t } = useI18n();
const dependencies = useDependencies();

const back = () => goBack(dependencies);
const reset = () => getArtifact(dependencies, props.artifactId);
const { payload, task } = useTask(async (dependencies, payload) => {
  await editArtifact(dependencies, payload);
  back();
}, reset);
</script>

<template>
  <frame-dashboard :title="t('shared.edit')">
    <form-base
      :error="task.error"
      @submit="task.run"
    >
      <template #default>
        <input-text
          id="input-name"
          v-model="payload.name"
          :label="t('shared.name')"
          autofocus
        />
        <panel-responsive equal>
          <input-date
            id="input-start"
            v-model="payload.start"
            :label="t('shared.date-start')"
          />
          <input-date
            id="input-end"
            v-model="payload.end"
            :label="t('shared.date-end')"
          />
        </panel-responsive>
        <input-rich
          id="input-notes"
          v-model="payload.notes"
          :label="t('shared.notes')"
        />
      </template>
      <template #buttons>
        <button-base
          id="button-save"
          type="submit"
          :label="t('shared.save')"
          :busy="task.busy"
        />
        <button-base
          id="button-cancel"
          :label="t('shared.cancel')"
          @click="back"
        />
      </template>
    </form-base>
  </frame-dashboard>
</template>
