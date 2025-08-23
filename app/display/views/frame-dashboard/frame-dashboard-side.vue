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
const { services } = Store.use();
const route = useRoute();
const router = useRouter();
const preloading = usePreloading();

const baseIcon = "bx bx-md";

const active: ComputedRef<string> = computed(() => {
  if (typeof route.name === "string") return route.name;
  return "folders";
});

function handleClickPage(name: string) {
  void router.push({
    name,
    // this will enable that the current page state can restored when its sidebar link is clicked again in the future
    query: route.query
  });
}

function handleExit() {
  services.connectSource.disconnect();
  void router.push({ name: "open" });
}
</script>
<template>
  <SideBar :active="active">
    <template #default>
      <SideItem
        id="folders"
        :title="t('common.folders')"
        :icon="`${baseIcon} bx-list-ul`"
        data-test="sidebar-folders"
        @click="handleClickPage('folders')"
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
