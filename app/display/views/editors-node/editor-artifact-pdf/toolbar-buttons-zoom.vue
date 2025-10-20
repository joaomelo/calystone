<script setup lang="ts">

import { computed } from "vue";

import { AppIcon } from "@/display/affordances/icons";
import { InputText } from "@/display/affordances/input-text";
import { ToolbarButton } from "@/display/affordances/toolbar";

const zoom = defineModel<number>({ required: true });

const zoomText = computed(() => {
  const zoomValue = Math.round(zoom.value * 100);
  return `${zoomValue.toFixed(0)}%`;
});

const delta = 0.1;

function handleZoomPlus() {
  zoom.value = Math.min(zoom.value + delta, 5);
}

function handleZoomMinus() {
  zoom.value = Math.max(zoom.value - delta, 0.1);
}
</script>
<template>
  <ToolbarButton
    data-test="button-zoom-minus"
    @click="handleZoomMinus"
  >
    <template #icon>
      <AppIcon name="zoom-minus" />
    </template>
  </ToolbarButton>
  <InputText
    v-model="zoomText"
    data-test="input-zoom"
    readonly
    size="content"
  />
  <ToolbarButton
    data-test="button-zoom-plus"
    @click="handleZoomPlus"
  >
    <template #icon>
      <AppIcon name="zoom-plus" />
    </template>
  </ToolbarButton>
</template>
