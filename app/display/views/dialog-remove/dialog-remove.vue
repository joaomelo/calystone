<script setup lang="ts">
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import {
  ModalConfirm,
  useDispatch
} from "@/utils";
import { useI18n } from "@/utils/i18n";
import { useTemplateRef } from "vue";

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