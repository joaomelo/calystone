<script setup>
import { FrameBase } from "../frame-base";
import SideBar from "./side-bar.vue";

defineProps({
  title: { type: String, default: null },
});
</script>
<template>
  <frame-base>
    <template #default>
      <div class="frame-dashboard">
        <side-bar />
        <div>
          <div class="frame-dashboard-title">
            {{ title }}
          </div>
          <slot></slot>
        </div>
      </div>
    </template>
  </frame-base>
</template>
<style scoped>
.frame-dashboard {
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: var(--size-50);
}

.frame-dashboard-title {
  font-weight: var(--font-weight-30);
  font-size: var(--font-size-20);
  margin-block-end: var(--size-25);
}
</style>
