<script setup>
import { inject } from "vue";
import { ButtonBase } from "../../components";
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
</script>
<template>
  <page-base :title="title" :busy="busy" :visibility="PAGE_VISIBILITY.INTERNAL">
    <template #aside>
      <button-base @click="handleSignOut">Sign Out</button-base>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </page-base>
</template>
