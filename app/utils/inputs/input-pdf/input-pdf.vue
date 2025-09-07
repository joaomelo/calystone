<script setup lang="ts">
import { createPluginRegistration } from "@embedpdf/core";
import { EmbedPDF } from "@embedpdf/core/vue";
import { usePdfiumEngine } from "@embedpdf/engines/vue";
import { LoaderPluginPackage } from "@embedpdf/plugin-loader/vue";
import {
  RenderLayer,
  RenderPluginPackage
} from "@embedpdf/plugin-render/vue";
import {
  Scroller,
  ScrollPluginPackage
} from "@embedpdf/plugin-scroll/vue";
import {
  Viewport,
  ViewportPluginPackage
} from "@embedpdf/plugin-viewport/vue";
import { useId } from "vue";

const { pdfId } = defineProps<{
  dataTest: string,
  pdfId?: string
}>();
const model = defineModel<ArrayBuffer>({ required: true });

const {
  engine,
  isLoading
} = usePdfiumEngine();

const normalizedPdfId = pdfId ?? useId();

const plugins = [
  createPluginRegistration(LoaderPluginPackage, { loadingOptions: {
    pdfFile: {
      content: model.value,
      id: normalizedPdfId
    },
    type: "buffer",
  } }),
  createPluginRegistration(ViewportPluginPackage),
  createPluginRegistration(ScrollPluginPackage),
  createPluginRegistration(RenderPluginPackage),
];
</script>
<template>
  <div
    class="input-pdf"
    :dataTest="dataTest"
  >
    <div v-if="isLoading || !engine">
      opening...
    </div>

    <EmbedPDF
      v-else
      :engine="engine"
      :plugins="plugins"
    >
      <Viewport class="viewport-class">
        <Scroller>
          <template #default="{ page }">
            <div
              :style="{
                width: `${page.width}px`,
                height: `${page.height}px`,
              }"
            >
              <RenderLayer :page-index="page.pageIndex" />
            </div>
          </template>
        </Scroller>
      </Viewport>
    </EmbedPDF>
  </div>
</template>
<style scoped>
.input-pdf {
  height: 100%;
  text-align: center;
  vertical-align: middle;
}

.viewport-class {
  background-color: #f1f3f5;
}
</style>