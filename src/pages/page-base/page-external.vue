<script setup>
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
</script>
<template>
  <page-base :title="title" :busy="busy" :visibility="PAGE_VISIBILITY.EXTERNAL">
    <template #default>
      <slot></slot>
    </template>
  </page-base>
</template>
