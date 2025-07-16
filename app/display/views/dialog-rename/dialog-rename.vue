<script setup lang="ts">
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { SaveCancel } from "@/display/views/save-cancel";
import {
  InputText, ModalBase, useDispatch
} from "@/utils";
import { useI18n } from "@/utils/i18n";
import {
  reactive, useTemplateRef
} from "vue";

const { node } = defineProps<{ node: Node }>();
defineExpose({ open });

const { services } = Store.use();
const { t } = useI18n();
const modal = useTemplateRef("modal");

const data = reactive({ name: node.name, });

const {
  dispatch, errors, loading
} = useDispatch();

function open() {
  data.name = node.name;
  modal.value?.open();
}

async function save() {
  const success = await dispatch(() => services.renameNode.rename({
    name: data.name,
    node: node
  }));
  if (!success) return;
  modal.value?.close();
}
</script>
<template>
  <ModalBase
    ref="modal"
    data-test="modal-rename"
    :header="t('rename')"
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
      <SaveCancel
        :saving="loading"
        @cancel="close"
        @save="save"
      />
    </template>
  </ModalBase>
</template>