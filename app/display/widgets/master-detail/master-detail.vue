<script setup lang="ts">
import { ButtonBase } from "@/display/widgets/button-base";
import { SplitterPanel } from "@/display/widgets/splitter-panel";
import { useMediaQuery } from "@vueuse/core";
import Drawer from "primevue/drawer";

const visible = defineModel({
  type: Boolean
});

const isMobile = useMediaQuery("(max-width: 768px)");
</script>
<template>
  <div v-if="isMobile">
    <div>
      <slot name="master" />
    </div>
    <Drawer
      v-model:visible="visible"
      position="full"
    >
      <template #container="{ closeCallback }">
        <div class="master-detail-mobile-header">
          <ButtonBase
            icon="bx bx-xs bx-x"
            rounded
            outlined
            @click="closeCallback"
          />
        </div>
        <div>
          <slot name="detail" />
        </div>
      </template>
    </Drawer>
  </div>
  <SplitterPanel v-else>
    <template #start>
      <slot name="master" />
    </template>
    <template #end>
      <slot name="detail" />
    </template>
  </SplitterPanel>
</template>
<style scoped>
.master-detail-mobile-header {
  display: flex;
  justify-content: flex-end;
  padding: var(--size-2);
  background-color: var(--p-surface-100);
}

.master-detail-mobile-header :deep(.p-button) {
  --button-size: var(--size-fluid-3);
  height: var(--button-size);
  width: var(--button-size);
}
</style>