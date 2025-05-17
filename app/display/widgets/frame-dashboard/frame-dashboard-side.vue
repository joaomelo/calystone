<script setup lang="ts">
import type { ComputedRef } from "vue";

import { Store } from "@/display/store";
import { SideBar, SideItem, useI18n } from "@/utils";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import SideItemLoading from "./side-item-loading.vue";

const { t } = useI18n();
const { services } = Store.use();

const route = useRoute();
const router = useRouter();

const baseIcon = "bx bx-md";

const active: ComputedRef<string> = computed(() => {
  if (typeof route.name === "string") return route.name;
  return "outline";
});

function handleClickPage(name: string) {
  void router.push({ name });
}

function handleExit() {
  // we push open immediately to avoid rendering the dashboard while the services are being disconnected
  void router.push({ name: "open" }).then(() => {
    services.connectSource.disconnect();
  });
}

function handleReload() {
  services.connectSource.reconnect();
}
</script>
<template>
  <SideBar :active="active">
    <template #default>
      <SideItem
        id="outline"
        :title="t('common.outline')"
        :icon="`${baseIcon} bx-list-ul`"
        data-test="sidebar-outline"
        @click="handleClickPage('outline')"
      />
      <SideItem
        id="tags"
        :title="t('common.tags')"
        :icon="`${baseIcon} bxs-purchase-tag-alt`"
        data-test="sidebar-tags"
        @click="handleClickPage('tags')"
      />
      <SideItem
        id="search"
        :title="t('common.search')"
        :icon="`${baseIcon} bx-search-alt`"
        data-test="sidebar-search"
        @click="handleClickPage('search')"
      />
    </template>
    <template #bottom>
      <SideItemLoading />
      <SideItem
        id="reload"
        :icon="`${baseIcon} bx-refresh`"
        :title="t('reload')"
        data-test="sidebar-reload"
        @click="handleReload"
      />
      <SideItem
        id="exit"
        :icon="`${baseIcon} bx-log-out`"
        :title="t('exit')"
        data-test="sidebar-exit"
        @click="handleExit"
      />
    </template>
  </SideBar>
</template>

<style scoped>
.loading :deep(.side-item-icon) {
  animation-duration: 7s;
}
</style>
