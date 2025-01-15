<script setup lang="ts">
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
        <div class="master-detail-mobile-detail">
          <slot
            name="detail"
            :close="closeCallback"
          />
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
.master-detail-mobile-detail-header :deep(.p-button) {
  --button-size: var(--size-fluid-3);
  height: var(--button-size);
  width: var(--button-size);
}

.master-detail-mobile-detail {
  height: 100%;
}
</style>