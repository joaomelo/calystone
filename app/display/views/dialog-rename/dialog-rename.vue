<script setup lang="ts">
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { ButtonBase } from "@/display/widgets/button-base";
import { InputText, ModalBase, useErrors } from "@/utils";
import { useI18n } from "@/utils/i18n";
import { reactive, useTemplateRef } from "vue";

const { node } = defineProps<{
  node: Node
}>();
defineExpose({ open });

const { service } = Store.use();
const { t } = useI18n();
const modal = useTemplateRef("modal");

const data = reactive({
  name: node.name,
});

const { dispatch, errors } = useErrors();

function open() {
  data.name = node.name;
  modal.value?.open();
}

async function save() {
  const success = await dispatch(() => service.nodeRename.rename({ name: data.name, node: node }));
  if (!success) return;
  modal.value?.close();
}
</script>
<template>
  <ModalBase
    ref="modal"
    :header="t('rename')"
    :error="errors.global"
  >
    <template #content>
      <pre>{{ errors }}</pre>
      <InputText
        v-model="data.name"
        :label="t('name')"
        autofocus
        :error="errors.name"
      />
    </template>
    <template #buttons="{ close }">
      <ButtonBase
        :label="t('cancel')"
        severity="secondary"
        @click="close"
      />
      <ButtonBase
        :label="t('save')"
        severity="primary"
        @click="save"
      />
    </template>
  </ModalBase>
</template>