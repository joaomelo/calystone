<script setup lang="ts">
import { useTemplateRef } from "vue";

import type { Node } from "@/domain";

import { ModalConfirm, } from "@/display/affordances/dialogs";
import { useDispatch } from "@/display/affordances/dispatch";
import { useI18n } from "@/display/affordances/i18n";
import { Store } from "@/display/store";

const { node } = defineProps<{ node: Node }>();
defineExpose({ remove });

const { services } = Store.use();
const { t } = useI18n();
const modalRemove = useTemplateRef("modalRemove");

const {
  dispatchOrToast,
  loading
} = useDispatch();

async function remove() {
  if (!modalRemove.value) return false;

  if (await modalRemove.value.confirm()) {
    await dispatchOrToast(() => services.removeNode.remove(node));
    return true;
  }

  return false;
}
</script>
<template>
  <ModalConfirm
    ref="modalRemove"
    :cancel-label="t('cancel')"
    :confirm-label="t('delete')"
    data-test="modal-remove"
    :header="t('delete')"
    :loading="loading"
    :message="t('delete-node', { name: node.name })"
  />
</template>