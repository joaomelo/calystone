<script setup lang="ts">
import {
  reactive,
  useTemplateRef
} from "vue";

import type { Directory } from "@/domain";

import { Store } from "@/display/store";
import { SaveCancel } from "@/display/views/save-cancel";
import {
  InputText,
  ModalBase,
  useDispatch,
  useI18n
} from "@/utils";

const { parent } = defineProps<{ parent: Directory }>();
defineExpose({ open });

const { services } = Store.use();
const { t } = useI18n();
const modal = useTemplateRef("modal");

const data = reactive({ name: "", });

const {
  dispatch,
  errors,
  loading
} = useDispatch();

async function handleSave() {
  const success = await dispatch(() => services.createNode.createArtifact({
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
    :error="errors.global"
    :header="t('create-artifact')"
  >
    <template #content>
      <InputText
        v-model="data.name"
        autofocus
        data-test="input-name"
        :error="errors.name"
        :label="t('name')"
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