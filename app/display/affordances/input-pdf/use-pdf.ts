import type {
  PageViewport,
  PDFDocumentProxy,
} from "pdfjs-dist";
import type { MaybeRef } from "vue";

import {
  getDocument,
  GlobalWorkerOptions
} from "pdfjs-dist";
import { TextLayerBuilder } from "pdfjs-dist/web/pdf_viewer.mjs";
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  unref,
  watch
} from "vue";

import { throwError } from "@/utils";

export function usePdf({
  container: containerRef,
  pdf,
  zoom: zoomRef,
}: {
  container: MaybeRef<HTMLElement | null>
  pdf: ArrayBuffer,
  zoom: MaybeRef<number>
}) {
  const workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
  if (GlobalWorkerOptions.workerSrc !== workerSrc) {
    GlobalWorkerOptions.workerSrc = workerSrc;
  }

  const openingDocument = ref(false);
  const rendering = ref(false);
  const loading = computed(() => openingDocument.value || rendering.value);

  const openDocumentError = ref<Error | undefined>();
  const renderError = ref<Error | undefined>();
  const currentError = computed(() => openDocumentError.value ?? renderError.value);

  const currentPdfDocument = shallowRef<PDFDocumentProxy | undefined>();

  let sessionToken = 0;
  const currentTextLayers: TextLayerBuilder[] = [];

  onMounted(openPdfDocument);
  onBeforeUnmount(destroyDocument);

  watch(
    [ () => unref(currentPdfDocument), () => unref(zoomRef), () => unref(containerRef) ],
    async ([newPdfDocument, newZoom, newContainer]) => {
      if (!newContainer) return;
      if (!newPdfDocument) return;

      const currentRenderToken = ++sessionToken;

      rendering.value = true;
      renderError.value = undefined;

      try {
        await render({
          container: newContainer,
          currentRenderToken,
          pdfDocument: newPdfDocument,
          zoom: newZoom,
        });
      } catch (error) {
        console.error(error);
        if (currentRenderToken !== sessionToken) return;
        if (!(error instanceof Error)) return;
        renderError.value = error;
      } finally {
        if (currentRenderToken === sessionToken) {
          rendering.value = false;
        }
      }
    },
    { immediate: true }
  );

  async function openPdfDocument() {
    openingDocument.value = true;
    try {
      // create a copy of the pdf data to avoid errors regarding detached buffers in pdf.js
      const typedArraySource = new Uint8Array(pdf);
      const typedArrayCopy = new Uint8Array(typedArraySource.slice());

      const loadingTask = getDocument({ data: typedArrayCopy });
      currentPdfDocument.value = await loadingTask.promise;
    } catch (error) {
      if (error instanceof Error) {
        openDocumentError.value = error;
      }
    } finally {
      openingDocument.value = false;
    }
  }

  async function render({
    container,
    currentRenderToken,
    pdfDocument,
    zoom: rawZoom
  }: {
    container: HTMLElement
    currentRenderToken: number,
    pdfDocument: PDFDocumentProxy,
    zoom: number
  }) {
    container.replaceChildren();
    destroyTextLayers();

    const zoom = sanitizeZoom(rawZoom);
    const devicePixelRatio = typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;

    for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
      const page = await pdfDocument.getPage(pageNumber);
      if (currentRenderToken !== sessionToken) return;

      const viewport = page.getViewport({ scale: zoom });
      const viewportPixels = viewportPixelDimensions(viewport);

      const pageContainer = document.createElement("div");
      pageContainer.className = "input-pdf__page-wrapper";
      pageContainer.style.width = viewportPixels.width;
      pageContainer.style.height = viewportPixels.height;

      const canvas = document.createElement("canvas");
      canvas.className = "input-pdf__page";
      const outputWidth = Math.floor(viewport.width * devicePixelRatio);
      const outputHeight = Math.floor(viewport.height * devicePixelRatio);
      canvas.width = Math.max(outputWidth, 1);
      canvas.height = Math.max(outputHeight, 1);
      canvas.style.width = viewportPixels.width;
      canvas.style.height = viewportPixels.height;
      canvas.style.maxWidth = "none";
      canvas.style.maxHeight = "none";
      canvas.style.minWidth = viewportPixels.width;
      canvas.style.minHeight = viewportPixels.height;
      // improves text layer interaction
      canvas.style.pointerEvents = "none";

      const context = canvas.getContext("2d");
      if (!context) throwError("PDFJS_WRAPPER_NO_2D_CONTEXT");

      const { userUnit } = page;
      pageContainer.style.setProperty("--total-scale-factor", zoom.toFixed(2));
      pageContainer.style.setProperty("--scale-factor", zoom.toFixed(2));
      pageContainer.style.setProperty("--user-unit", userUnit.toFixed(0));
      pageContainer.style.setProperty("--scale-round-x", "1px");
      pageContainer.style.setProperty("--scale-round-y", "1px");
      const textLayer = new TextLayerBuilder({ pdfPage: page });
      textLayer.div.classList.add("input-pdf__text-layer");
      currentTextLayers.push(textLayer);

      pageContainer.appendChild(canvas);
      pageContainer.appendChild(textLayer.div);
      container.appendChild(pageContainer);

      const transform = devicePixelRatio !== 1 ? [devicePixelRatio, 0, 0, devicePixelRatio, 0, 0] : undefined;

      const pageRenderTask = page.render({
        canvas,
        canvasContext: context,
        viewport,
        ...(transform ? { transform } : {})
      });
      const textLayerTask = textLayer.render({ viewport });
      try {
        await Promise.all([
          pageRenderTask.promise,
          textLayerTask
        ]);
      } catch (error) {
        if (currentRenderToken !== sessionToken) return;
        throw error;
      }

    }

  }

  async function destroyDocument() {
    if (currentPdfDocument.value) {
      try {
        await currentPdfDocument.value.destroy();
      } catch {
        // ignore failures during cleanup
      } finally {
        currentPdfDocument.value = undefined;
      }
    }
  }

  function destroyTextLayers() {
    try {
      for (const layer of currentTextLayers) {
        layer.cancel();
      }
    } catch {
      // ignore failures during cleanup
    } finally {
      currentTextLayers.length = 0;
    }
  }

  return {
    error: currentError,
    loading,
  };
}

export function viewportPixelDimensions(viewport: PageViewport ) {
  return {
    height: `${viewport.height.toString()}px`,
    width: `${viewport.width.toString()}px`
  };
}

export function sanitizeZoom(value: number): number {
  if (!Number.isFinite(value)) return 1;
  if (value < 0) return 1;
  return value;
}
