<script setup lang="ts">
import { usePilot } from "@pilot";
import { ButtonBase, useTask } from "@view/components";
import { useT } from "@view/i18n";
import { FrameBase } from "../frame-base";

defineProps<Props>();
type Props = {
  title: string;
};

const t = useT();

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
            @click="signOut.run"
          >
            {{ t("sign-out") }}
          </button-base>
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
