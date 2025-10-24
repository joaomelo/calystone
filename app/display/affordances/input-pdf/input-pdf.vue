<script setup lang="ts">
import {
  toRefs,
  useTemplateRef
} from "vue";

import { useI18n } from "@/display/affordances/i18n";
import { InputError } from "@/display/affordances/input-error";

import { usePdf } from "./use-pdf";

const props = defineProps<{
  dataTest: string,
  zoom: number
}>();
const model = defineModel<ArrayBuffer>({ required: true });

const { t } = useI18n();
const containerRef = useTemplateRef("containerRef");

const { zoom: zoomRef } = toRefs(props);
const {
  error,
  loading,
} = usePdf({
  container: containerRef,
  pdf: model.value,
  zoom: zoomRef,
});

</script>
<template>
  <div
    class="input-pdf"
    :data-test="dataTest"
  >
    <div
      ref="containerRef"
      class="input-pdf__document-wrapper"
      :class="{ 'hidden': loading || error }"
    />
    <div v-if="loading">
      {{ t("loading") }}...
    </div>
    <InputError
      v-else-if="error"
      class="input-pdf__message"
      :data-test="`${dataTest}-error`"
      :message="error.message"
    />
  </div>
</template>
<style scoped>
.input-pdf {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.input-pdf__message {
  padding: var(--size-5);
  text-align: center;
}

.input-pdf__document-wrapper {
  padding: var(--size-5);
  margin: 0 auto;
  overflow: auto;
  background-color: var(--p-surface-100);

  &.hidden {
    padding: 0;
    visibility: hidden;
  }
}

:deep(.input-pdf__page-wrapper) {
  position: relative;
  margin: 0 auto;
}

:deep(.input-pdf__page) {
  box-shadow: var(--p-card-shadow);
  display: block;
  margin: 0 auto;
  max-width: none;
  width: auto;
}

:deep(.input-pdf__text-layer) {
  position: absolute;
  inset: 0;
  overflow: clip;
  text-align: initial;
  line-height: 1;
  user-select: auto;
  transform-origin: 0 0;
  pointer-events: auto;
}

:deep(.input-pdf__text-layer span),
:deep(.input-pdf__text-layer br) {
  color: transparent;
  cursor: text;
  position: absolute;
  white-space: pre;
  transform-origin: 0 0;
}

:deep(.input-pdf__text-layer .endOfContent) {
  position: absolute;
  width: 1px;
  height: 1px;
  top: 0;
  left: 0;
}
</style>
