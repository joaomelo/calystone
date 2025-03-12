<script setup lang="ts">
import type { Node } from "@/domain";

import { useI18n } from "@/display/i18n";
import { Store } from "@/display/store";
import { ButtonBase } from "@/display/widgets/button-base";
import { InputText } from "@/display/widgets/input-text";
import { ModalBase } from "@/display/widgets/modal-base";
import { useCommand } from "@/utils";
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

const { dispatch, errors } = useCommand(() => service.nodeRename.rename({ name: data.name, node: node }));

function open() {
  data.name = node.name;
  modal.value?.open();
}

async function save() {
  const success = await dispatch();
  if (!success) return;
  modal.value?.close();
}
</script>
<template>
  <ModalBase
    ref="modal"
    :header="t('rename')"
  >
    <template #content>
      <InputText
        v-model="data.name"
        :label="t('name')"
        autofocus
        :error="errors.name ?? errors.form"
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