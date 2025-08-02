<script setup lang="ts">
import { ButtonBase } from "@/utils/actions";
import {
  kebabCase,
  TextMessage
} from "@/utils/text";
import { useTemplateRef } from "vue";

import { ModalBase } from "../modal-base";

const {
  cancelLabel = "cancel",
  confirmLabel = "confirm",
  header = "confirm",
  loading = false,
  message = "are you sure?",
} = defineProps<{
  cancelLabel?: string,
  confirmLabel?: string,
  dataTest: string,
  header?: string,
  loading: boolean,
  message?: string,
}>();
defineExpose({ confirm });

const modalBase = useTemplateRef("modalBase");

let resolveContainer: (value: boolean) => void;

function confirm(): Promise<boolean> {
  modalBase.value?.open();
  return new Promise<boolean>((resolve) => {
    resolveContainer = resolve;
  });
}

function handleDone(choice: boolean) {
  modalBase.value?.close();
  resolveContainer(choice);
}
</script>
<template>
  <ModalBase
    ref="modalBase"
    :header="header"
    :data-test="dataTest"
  >
    <template #content>
      <TextMessage
        severity="warn"
        variant="simple"
        :data-test="kebabCase(dataTest, 'message')"
      >
        {{ message }}
      </TextMessage>
    </template>
    <template #buttons>
      <ButtonBase
        :label="cancelLabel"
        severity="secondary"
        :data-test="kebabCase(dataTest, 'cancel')"
        @click="handleDone(false)"
      />
      <ButtonBase
        :label="confirmLabel"
        severity="primary"
        :data-test="kebabCase(dataTest, 'confirm')"
        :loading="loading"
        @click="handleDone(true)"
      />
    </template>
  </ModalBase>
</template>
