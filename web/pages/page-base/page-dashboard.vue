<script setup>
import { ButtonBase, useGlobals, useGlobalStateful } from "../../../lib";
import PageBase from "./page-base.vue";

defineProps({
  title: {
    type: String,
    default: null,
  },
  busy: {
    type: Boolean,
    default: false,
  },
});

const { auth } = useGlobals();
const handleSignOut = () => auth.signOut();

const signOutText = useGlobalStateful((i18n) => i18n.t("signOut"));
</script>
<template>
  <page-base :title="title" :busy="busy">
    <template #aside>
      <button-base @click="handleSignOut">{{ signOutText }}</button-base>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </page-base>
</template>
