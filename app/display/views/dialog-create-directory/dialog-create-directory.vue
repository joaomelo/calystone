<script setup lang="ts">
import type { Directory } from "@/domain";

import { Store } from "@/display/store";
import { ButtonsSaveCancel } from "@/display/views/buttons-save-cancel";
import { InputText, ModalBase, useDispatch } from "@/utils";
import { useI18n } from "@/utils/i18n";
import { reactive, useTemplateRef } from "vue";

const { parent } = defineProps<{
  parent: Directory
}>();
defineExpose({ open });

const { services } = Store.use();
const { t } = useI18n();
const modal = useTemplateRef("modal");

const data = reactive({
  name: "",
});

const { dispatch, errors, loading } = useDispatch();

async function handleSave() {
  const success = await dispatch(() => services.createDirectory.create({ name: data.name, parent }));
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
    data-test="modal-create-directory"
    :header="t('create-directory')"
    :error="errors.global"
  >
    <template #content>
      <InputText
        v-model="data.name"
        :label="t('name')"
        :error="errors.name"
        data-test="input-name"
      />
    </template>
    <template #buttons="{ close }">
      <ButtonsSaveCancel
        :saving="loading"
        @cancel="close"
        @save="handleSave"
      />
    </template>
  </ModalBase>
</template>