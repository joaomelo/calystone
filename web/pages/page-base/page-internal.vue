<script setup>
import { inject } from "vue";
import { ButtonBase, useStateful } from "../../../lib";
import { PAGE_VISIBILITY } from "./visibilities";
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

const { auth } = inject("globals");
const handleSignOut = () => auth.signOut();

const { i18n } = inject("globals");
const signOutText = useStateful(i18n, (i) => i.t("signOut"));
</script>
<template>
  <page-base :title="title" :busy="busy" :visibility="PAGE_VISIBILITY.INTERNAL">
    <template #aside>
      <button-base @click="handleSignOut">{{ signOutText }}</button-base>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </page-base>
</template>
