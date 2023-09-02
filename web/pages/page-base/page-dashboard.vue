<script setup>
import { ButtonBase, useService, useT } from "@lib";
import PageBase from "./page-base.vue";

defineProps({
  busy: {
    type: Boolean,
    default: false,
  },
});

const auth = useService("auth");
const t = useT();
</script>
<template>
  <page-base :busy="busy">
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #aside>
      <button-base @click="auth.signOut" class="page-dashboard-sign-out">
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
</style>
