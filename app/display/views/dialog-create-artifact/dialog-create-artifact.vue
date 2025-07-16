<script setup lang="ts">
import type { Directory } from "@/domain";

import { Store } from "@/display/store";
import { SaveCancel } from "@/display/views/save-cancel";
import {
  InputText, ModalBase, useDispatch, useI18n
} from "@/utils";
import {
  reactive, useTemplateRef
} from "vue";

const { parent } = defineProps<{ parent: Directory }>();
defineExpose({ open });

const { services } = Store.use();
const { t } = useI18n();
const modal = useTemplateRef("modal");

const data = reactive({ name: "", });

const {
  dispatch, errors, loading
} = useDispatch();

async function handleSave() {
  const success = await dispatch(() => services.createArtifact.create({
    name: data.name,
    parent
  }));
  if (!success) return;
  modal.value?.close();
}

function open() {
  data.name = "";
  modal.value?.open();
}
</script>
<template>
  <ModalBase
    ref="modal"
    data-test="modal-create-artifact"
    :header="t('create-artifact')"
    :error="errors.global"
  >
    <template #content>
      <InputText
        v-model="data.name"
        autofocus
        :label="t('name')"
        :error="errors.name"
        data-test="input-name"
      />
    </template>
    <template #buttons="{ close }">
      <SaveCancel
        :saving="loading"
        @cancel="close"
        @save="handleSave"
      />
    </template>
  </ModalBase>
</template>