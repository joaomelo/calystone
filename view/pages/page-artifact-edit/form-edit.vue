<script setup>
import { reactive } from "vue";
import { FormBase, InputBase, ButtonBase, useI18n, useTask } from "@lib";
import { useBody } from "@body";
import { useDisplay } from "@view/display";

const props = defineProps({
  artifactId: {
    type: String,
    required: true,
  },
});

const display = useDisplay();
const { t } = useI18n();
const { artifacts } = useBody();

const { id, name, notes } = artifacts.findById(props.artifactId);
const payload = reactive({ id, name, notes });

const edit = useTask(async () => {
  await artifacts.edit(payload);
  push();
});

const push = () => display.pageOutline();
</script>
<template>
  <form-base :error="edit.error" @submit="edit.run">
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
        :busy="edit.busy"
      />
      <button-base :label="t('page-artifact-edit.cancel')" @click="push" />
    </template>
  </form-base>
</template>
