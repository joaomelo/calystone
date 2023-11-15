<script setup>
import { useI18n, ButtonBase, useTask } from "@lib";
import { usePilot } from "@pilot";
import { FrameBase } from "../frame-base";

defineProps({
  title: { type: String, default: null },
});

const { t } = useI18n();
const pilot = usePilot();
const signOut = useTask(() => pilot.signOut());
</script>
<template>
  <frame-base>
    <template #default>
      <nav class="frame-dashboard-nav">
        <div class="frame-dashboard-nav-title">
          {{ title }}
        </div>
        <div class="frame-dashboard-nav-aside">
          <button-base
            class="frame-dashboard-close"
            :busy="signOut.busy"
            :label="t('frame-dashboard.sign-out')"
            @click="signOut.run"
          />
        </div>
      </nav>
      <slot></slot>
    </template>
  </frame-base>
</template>
<style scoped>
.frame-dashboard-close {
  min-width: max-content;
}

.frame-dashboard-nav {
  margin-block-end: var(--size-20);
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.frame-dashboard-nav-title {
  flex: 1;
  min-width: 0;
}

.frame-dashboard-nav-aside {
  flex-shrink: 0;
}
</style>
