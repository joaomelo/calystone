<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { computed } from "vue";

import MasterDetailDesktop from "./master-detail-desktop.vue";
import MasterDetailMobile from "./master-detail-mobile.vue";

const isMobile = useMediaQuery("(max-width: 768px)");
const masterDetailComponent = computed(() => isMobile.value ? MasterDetailMobile : MasterDetailDesktop);
</script>
<template>
  <component :is="masterDetailComponent">
    <template #master>
      <slot name="master" />
    </template>
    <template #detail>
      <slot name="detail" />
    </template>
  </component>
</template>
