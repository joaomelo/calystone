<script setup>
import { FrameBase } from "../frame-base";
import { useSideBarState, screenLargeValue, useMediaQuery } from "@lib";
import FrameSide from "./frame-side.vue";
import FrameTop from "./frame-top.vue";

defineProps({
  title: { type: String, default: null },
});

const isLarge = useMediaQuery(`(min-width: ${screenLargeValue()})`);
const sideBarState = useSideBarState(isLarge);
</script>
<template>
  <frame-base>
    <template #default>
      <div class="frame-dashboard" :class="{ large: isLarge }">
        <frame-side v-model="sideBarState" />
        <div>
          <frame-top
            v-model="sideBarState"
            :title="title"
            class="frame-dashboard-top"
          />
          <slot></slot>
        </div>
      </div>
    </template>
  </frame-base>
</template>
<style scoped>
.frame-dashboard {
  display: grid;
  grid-template-columns: 1fr;
  column-gap: var(--size-40);
}

.frame-dashboard.large {
  grid-template-columns: max-content 1fr;
}

.frame-dashboard-top {
  margin-block-end: var(--size-25);
}
</style>
