<script setup lang="ts">
import type { ComputedRef } from "vue";

import { Store } from "@/display/store";
import {
  SideBar,
  SideItem,
  useI18n
} from "@/utils";
import { computed } from "vue";
import {
  useRoute,
  useRouter
} from "vue-router";

import { usePreloading } from "./use-preloading";

const { t } = useI18n();
const {
  enablePriorityPage,
  services
} = Store.use();
const route = useRoute();
const router = useRouter();
const preloading = usePreloading();

const baseIcon = "bx bx-md";

const active: ComputedRef<string> = computed(() => {
  if (typeof route.name === "string") return route.name;
  return "nodes";
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
</script>
<template>
  <SideBar :active="active">
    <template #default>
      <SideItem
        id="outline"
        :title="t('common.outline')"
        :icon="`${baseIcon} bx-list-ul`"
        data-test="sidebar-outline"
        @click="handleClickPage('nodes')"
      />
      <SideItem
        id="calendar"
        :title="t('common.calendar')"
        :icon="`${baseIcon} bxs-calendar`"
        data-test="sidebar-calendar"
        @click="handleClickPage('calendar')"
      />
      <SideItem
        id="tags"
        :title="t('common.tags')"
        :icon="`${baseIcon} bxs-purchase-tag-alt`"
        data-test="sidebar-tags"
        @click="handleClickPage('tags')"
      />
      <SideItem
        v-if="enablePriorityPage"
        id="priority"
        :title="t('common.priority')"
        :icon="`${baseIcon} bxs-flag-alt`"
        data-test="sidebar-priority"
        @click="handleClickPage('priority')"
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
      <SideItem
        v-if="preloading"
        id="preloading"
        disabled
        :icon="`${baseIcon} bx-loader bx-spin`"
        :title="t('dashboard.preloading')"
        data-test="sidebar-preloading"
        class="sidebar-preload"
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
.sidebar-preload :deep(.side-item-icon) {
  animation-duration: 7s;
}
</style>
