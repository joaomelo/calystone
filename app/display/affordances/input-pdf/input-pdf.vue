<script setup lang="ts">
import { useId } from "vue";

import PdfjsWrapper from "./pdfjs-wrapper.vue";

const { cacheKey: cacheKey } = defineProps<{
  cacheKey?: string
  dataTest: string,
  zoom: number
}>();
const model = defineModel<ArrayBuffer>({ required: true });
const normalizedCacheKey = cacheKey ?? useId();
</script>
<template>
  <div
    class="input-pdf"
    :data-test="dataTest"
  >
    <PdfjsWrapper
      :cache-key="normalizedCacheKey"
      :pdf="model"
      :zoom="zoom"
    />
  </div>
</template>
<style scoped>
.input-pdf {
  height: 100%;
  text-align: center;
  vertical-align: middle;
}
</style>
