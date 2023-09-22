<script setup>
import { ButtonBase } from "@web/components";
import { useT } from "@web/i18n";
import { LayoutBase } from "../layout-base";
import { useClose } from "./use-close";

const emit = defineEmits(["close"]);

const t = useT();
const closeTask = useClose(() => emit("close"));
</script>
<template>
  <layout-base>
    <template #header>
      <nav class="layout-dashboard-nav">
        <div class="layout-dashboard-nav-title">
          <slot name="title"></slot>
        </div>
        <div class="layout-dashboard-nav-aside">
          <button-base @click="closeTask.run" class="layout-dashboard-close">
            {{ t("close") }}
          </button-base>
        </div>
      </nav>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </layout-base>
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
