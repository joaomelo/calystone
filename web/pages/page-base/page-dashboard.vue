<script setup>
import { ButtonBase, useT } from "@lib";
import { useSignOut } from "@lib";
import PageBase from "./page-base.vue";

defineProps({
  busy: {
    type: Boolean,
    default: false,
  },
});

const signOut = useSignOut();
const t = useT();
</script>
<template>
  <page-base :busy="busy">
    <template #header>
      <nav class="page-base-nav">
        <div class="page-base-nav-title">
          <slot name="title"></slot>
        </div>
        <div class="page-base-nav-aside">
          <slot name="aside"></slot>
        </div>
      </nav>
    </template>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #aside>
      <button-base @click="signOut.run" class="page-dashboard-sign-out">
        {{ t("signOut") }}
      </button-base>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </page-base>
</template>
<style scoped>
.page-dashboard-sign-out {
  min-width: max-content;
}

.page-base-nav {
  margin-block-end: var(--size-30);
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.page-base-nav-title {
  flex: 1;
  min-width: 0;
}

.page-base-nav-aside {
  flex-shrink: 0;
}
</style>
