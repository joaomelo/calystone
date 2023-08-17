<script setup>
import { ButtonBase, useGlobals, useGlobalStateful } from "../../../lib";
import PageBase from "./page-base.vue";

defineProps({
  busy: {
    type: Boolean,
    default: false,
  },
});

const { shepherd } = useGlobals();
const handleSignOut = () => shepherd.signOut();

const signOutText = useGlobalStateful((i18n) => i18n.t("signOut"));
</script>
<template>
  <page-base :busy="busy">
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #aside>
      <button-base @click="handleSignOut" class="page-dashboard-sign-out">
        {{ signOutText }}
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
</style>
