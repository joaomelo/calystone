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
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: var(--size-5);
  margin: 0 auto;
  overflow: auto;
  background-color: var(--p-surface-100);
}

.input-pdf__document-wrapper.hidden {
  flex: 0;
  padding: 0;
  pointer-events: none;
  visibility: hidden;
}

:deep(.input-pdf__page-wrapper) {
  position: relative;
  margin: 0 auto;
}

:deep(.input-pdf__page) {
  position: relative; /* to contain the text layer */
  box-shadow: rgba(15, 23, 42, 0.1) 0 2px 8px;
  display: block;
  margin: 0 auto;
  max-width: none;
  width: auto;
}

:deep(.input-pdf) {
  position: absolute;
  inset: 0;
  overflow: clip;
  text-align: initial;
  line-height: 1;
  user-select: auto;
  transform-origin: 0 0;
  pointer-events: auto;
}

:deep(.input-pdf span),
:deep(.input-pdf br) {
  color: transparent;
  cursor: text;
  position: absolute;
  white-space: pre;
  transform-origin: 0 0;
}

:deep(.input-pdf .highlight) {
  background-color: rgba(180, 0, 170, 0.25);
  border-radius: 4px;
}

:deep(.input-pdf .highlight.selected) {
  background-color: rgba(0, 100, 255, 0.25);
}

:deep(.input-pdf .endOfContent) {
  position: absolute;
  width: 1px;
  height: 1px;
  top: 0;
  left: 0;
}

:deep(.input-pdf ::selection) {
  background: rgba(0, 100, 255, 0.25);
}

:deep(.input-pdf ::-moz-selection) {
  background: rgba(0, 100, 255, 0.4);
}
</style>
