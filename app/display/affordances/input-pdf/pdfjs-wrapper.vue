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

const props = defineProps<{
  pdf: ArrayBuffer,
  zoom: number
}>();

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

function sanitizeZoom(value: number): null | number {
  if (!Number.isFinite(value)) return null;
  return value > 0 ? value : null;
}

async function renderDocumentPages(documentProxy: PDFDocumentProxy, renderToken: number) {
  const container = containerRef.value;
  if (!container) return;

  resetContainer();

  const zoom = sanitizeZoom(props.zoom);
  const devicePixelRatio = typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;

  for (let pageNumber = 1; pageNumber <= documentProxy.numPages; pageNumber += 1) {
    if (renderToken !== activeRenderToken) return;

    const page = await documentProxy.getPage(pageNumber);
    if (renderToken !== activeRenderToken) return;

    const baseViewport = page.getViewport({ scale: 1 });
    const containerWidth = container.clientWidth || baseViewport.width;
    const fallbackScale = clampScale(baseViewport.width, containerWidth);
    const scale = zoom ?? fallbackScale;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.className = "pdfjs-wrapper__page";
    const outputWidth = Math.floor(viewport.width * devicePixelRatio);
    const outputHeight = Math.floor(viewport.height * devicePixelRatio);
    canvas.width = Math.max(outputWidth, 1);
    canvas.height = Math.max(outputHeight, 1);
    canvas.style.width = `${viewport.width.toFixed(0)}px`;
    canvas.style.height = `${viewport.height.toFixed(0)}px`;
    canvas.style.maxWidth = "none";
    canvas.style.maxHeight = "none";
    canvas.style.minWidth = `${viewport.width.toFixed(0)}px`;
    canvas.style.minHeight = `${viewport.height.toFixed(0)}px`;

    const context = canvas.getContext("2d");
    if (!context) throwError("PDFJS_WRAPPER_NO_2D_CONTEXT");

    const transform = devicePixelRatio !== 1 ? [devicePixelRatio, 0, 0, devicePixelRatio, 0, 0] : undefined;

    container.appendChild(canvas);

    const renderTask = page.render({
      canvas,
      canvasContext: context,
      transform,
      viewport,
    });

    try {
      await renderTask.promise;
    } catch (error) {
      if (renderToken !== activeRenderToken) return;
      throwError("PDFJS_WRAPPER_RENDER_ERROR", error);
    }
  }
}

async function renderPdfDocument(data: ArrayBuffer) {
  activeRenderToken += 1;
  const renderToken = activeRenderToken;

  await destroyLoadingTask();
  await destroyDocument();

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

    await renderDocumentPages(documentProxy, renderToken);
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

async function rerenderCurrentDocument() {
  if (!currentDocument) return;

  activeRenderToken += 1;
  const renderToken = activeRenderToken;

  isLoading.value = true;
  errorMessage.value = null;

  await nextTick();

  try {
    await renderDocumentPages(currentDocument, renderToken);
  } catch (error) {
    if (renderToken !== activeRenderToken) return;
    errorMessage.value = "Unable to render PDF.";
    throwError("PDFJS_WRAPPER_RENDER_ERROR", error);
  } finally {
    if (renderToken === activeRenderToken) {
      isLoading.value = false;
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

watch(() => props.zoom, () => {
  void rerenderCurrentDocument();
});

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
  height: 100%;
  width: 100%;
}

.pdfjs-wrapper__container {
  padding: var(--size-5);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--size-2);
  margin: 0 auto;
  overflow: auto;
  flex: 1;
  width: 100%;
  background-color: var(--p-surface-100);
}

.pdfjs-wrapper__container--hidden {
  pointer-events: none;
  visibility: hidden;
}

:deep(.pdfjs-wrapper__page) {
  box-shadow: var(--p-dialog-shadow);
  display: block;
  margin: 0 auto;
  max-width: none;
  width: auto;
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
