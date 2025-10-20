<script setup lang="ts">
import type {
  PDFDocumentLoadingTask,
  PDFDocumentProxy
} from "pdfjs-dist/types/src/pdf";

import {
  getDocument,
  GlobalWorkerOptions
} from "pdfjs-dist";
import {
  nextTick,
  onBeforeUnmount,
  ref,
  watch
} from "vue";

import { throwError } from "@/utils";

const props = defineProps<{ pdf: ArrayBuffer, }>();

const containerRef = ref<HTMLDivElement | null>(null);
const isLoading = ref(true);
const errorMessage = ref<null | string>(null);

let activeRenderToken = 0;
let currentLoadingTask: null | PDFDocumentLoadingTask = null;
let currentDocument: null | PDFDocumentProxy = null;

const workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

if (GlobalWorkerOptions.workerSrc !== workerSrc) {
  GlobalWorkerOptions.workerSrc = workerSrc;
}

async function destroyLoadingTask() {
  if (currentLoadingTask) {
    try {
      await currentLoadingTask.destroy();
    } catch {
      // ignore failures while tearing down an outdated task
    }
    currentLoadingTask = null;
  }
}

async function destroyDocument() {
  if (currentDocument) {
    const documentToRelease = currentDocument;
    currentDocument = null;
    try {
      await documentToRelease.destroy();
    } catch {
      // ignore failures during cleanup
    }
  }
}

function resetContainer() {
  const container = containerRef.value;
  if (container) container.replaceChildren();
}

function clampScale(unscaledWidth: number, containerWidth: number): number {
  if (unscaledWidth <= 0 || containerWidth <= 0) return 1;

  const scale = containerWidth / unscaledWidth;
  // prevent tiny widths while still letting wider pages upscale a bit
  const clamped = Math.min(Math.max(scale, 0.5), 2.0);
  return Number.isFinite(clamped) && clamped > 0 ? clamped : 1;
}

async function renderPdfDocument(data: ArrayBuffer) {
  activeRenderToken += 1;
  const renderToken = activeRenderToken;

  await destroyLoadingTask();
  await destroyDocument();
  resetContainer();

  isLoading.value = true;
  errorMessage.value = null;

  await nextTick();
  const container = containerRef.value;
  if (!container) {
    isLoading.value = false;
    return;
  }

  const typedArray = new Uint8Array(data);

  try {
    const loadingTask = getDocument({ data: typedArray });
    currentLoadingTask = loadingTask;
    const documentProxy = await loadingTask.promise;
    if (renderToken !== activeRenderToken) {
      await documentProxy.destroy();
      return;
    }

    currentDocument = documentProxy;

    for (let pageNumber = 1; pageNumber <= documentProxy.numPages; pageNumber += 1) {
      if (renderToken !== activeRenderToken) return;

      const page = await documentProxy.getPage(pageNumber);
      if (renderToken !== activeRenderToken) return;

      const baseViewport = page.getViewport({ scale: 1 });
      const containerWidth = container.clientWidth || baseViewport.width;
      const scale = clampScale(baseViewport.width, containerWidth);
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      canvas.className = "pdfjs-wrapper__page";
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const context = canvas.getContext("2d");
      if (!context) throwError("PDFJS_WRAPPER_NO_2D_CONTEXT");

      container.appendChild(canvas);

      const renderTask = page.render({
        canvas,
        canvasContext: context,
        viewport
      });

      try {
        await renderTask.promise;
      } catch (error) {
        if (renderToken !== activeRenderToken) return;
        throwError("PDFJS_WRAPPER_RENDER_ERROR", error);
      }
    }
  } catch (error) {
    if (renderToken !== activeRenderToken) return;
    errorMessage.value = "Unable to open PDF.";
    throwError("PDFJS_WRAPPER_DOCUMENT_ERROR", error);
  } finally {
    if (renderToken === activeRenderToken) {
      isLoading.value = false;
      currentLoadingTask = null;
    }
  }
}

watch(() => props.pdf, async (newValue) => {
  if (!(newValue instanceof ArrayBuffer) || newValue.byteLength === 0) {
    await destroyLoadingTask();
    await destroyDocument();
    resetContainer();
    isLoading.value = false;
    errorMessage.value = "This PDF is empty.";
    return;
  }

  await renderPdfDocument(newValue);
}, { immediate: true });

onBeforeUnmount(() => {
  activeRenderToken += 1;
  void destroyLoadingTask();
  void destroyDocument();
});
</script>
<template>
  <div class="pdfjs-wrapper">
    <div
      ref="containerRef"
      class="pdfjs-wrapper__container"
      :class="{ 'pdfjs-wrapper__container--hidden': isLoading || errorMessage }"
    />
    <div
      v-if="isLoading"
      class="pdfjs-wrapper__message"
    >
      opening...
    </div>
    <div
      v-else-if="errorMessage"
      class="pdfjs-wrapper__message pdfjs-wrapper__message--error"
      role="alert"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>
<style scoped>
.pdfjs-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  width: 100%;
}

.pdfjs-wrapper__container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 auto;
  overflow-y: auto;
  flex: 1;
  width: 100%;
}

.pdfjs-wrapper__container--hidden {
  pointer-events: none;
  visibility: hidden;
}

.pdfjs-wrapper__page {
  box-shadow: rgba(15, 23, 42, 0.1) 0 2px 8px;
  margin: 0 auto;
  max-width: min(100%, 900px);
  width: 100%;
}

.pdfjs-wrapper__message {
  color: #495057;
  font-size: 0.875rem;
  text-align: center;
}

.pdfjs-wrapper__message--error {
  color: #c92a2a;
}
</style>
