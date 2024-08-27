<script setup>
import { useIsAtLeastLarge, useSideBarState } from "@lib";

import { FrameBase } from "../frame-base";
import FrameSide from "./frame-side.vue";
import FrameTop from "./frame-top.vue";

defineProps({
  title: {
    default: null,
    type: String,
  },
});

const isLarge = useIsAtLeastLarge();
const sideBarState = useSideBarState(isLarge);
</script>
<template>
  <frame-base>
    <template #default>
      <div
        class="frame-dashboard"
        :class="{ large: isLarge }"
      >
        <frame-side v-model="sideBarState" />
        <div class="frame-dashboard-content">
          <frame-top
            v-model="sideBarState"
            :title="title"
          />
          <slot />
        </div>
      </div>
    </template>
  </frame-base>
</template>
<style scoped>
.frame-dashboard {
  display: grid;
  /* the minmax prevents content inside the frame dashboard grid to blow its width away. https://css-tricks.com/preventing-a-grid-blowout/  */
  grid-template-columns: minmax(0, 1fr);
  column-gap: var(--size-40);
}

.frame-dashboard.large {
  grid-template-columns: max-content minmax(0, 1fr);
}

.frame-dashboard-content {
  display: flex;
  flex-direction: column;
  gap: var(--size-25);
}
</style>
