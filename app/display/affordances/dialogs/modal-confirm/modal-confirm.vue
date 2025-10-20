<script setup lang="ts">
import { useTemplateRef } from "vue";

import { ButtonBase } from "@/display/affordances/button";
import { TextMessage } from "@/display/affordances/text-message";
import { kebabCase } from "@/utils";

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
    :data-test="dataTest"
    :header="header"
  >
    <template #content>
      <TextMessage
        :data-test="kebabCase(dataTest, 'message')"
        severity="warn"
        variant="simple"
      >
        {{ message }}
      </TextMessage>
    </template>
    <template #buttons>
      <ButtonBase
        :data-test="kebabCase(dataTest, 'cancel')"
        :label="cancelLabel"
        severity="secondary"
        @click="handleDone(false)"
      />
      <ButtonBase
        :data-test="kebabCase(dataTest, 'confirm')"
        :label="confirmLabel"
        :loading="loading"
        severity="primary"
        @click="handleDone(true)"
      />
    </template>
  </ModalBase>
</template>
