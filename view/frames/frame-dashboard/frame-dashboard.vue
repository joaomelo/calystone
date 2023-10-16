<script setup lang="ts">
import { ButtonBase } from "@view/components";
import { useT } from "@view/i18n";
import { FrameBase } from "../frame-base";
import { useClose } from "./use-close";

defineProps({
  title: {
    type: String,
    default: null,
  },
});
const emit = defineEmits(["close"]);

const t = useT();
const close = useClose();

const handleClose = () => {
  close();
  emit("close");
};
</script>
<template>
  <frame-base>
    <template #header>
      <nav class="layout-dashboard-nav">
        <div class="layout-dashboard-nav-title">
          {{ title }}
        </div>
        <div class="layout-dashboard-nav-aside">
          <button-base class="layout-dashboard-close" @click="handleClose">
            {{ t("close") }}
          </button-base>
        </div>
      </nav>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </frame-base>
</template>
<style scoped>
.layout-dashboard-close {
  min-width: max-content;
}

.layout-dashboard-nav {
  margin-block-end: var(--size-20);
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.layout-dashboard-nav-title {
  flex: 1;
  min-width: 0;
}

.layout-dashboard-nav-aside {
  flex-shrink: 0;
}
</style>
