<script setup lang="ts">
import type { ComputedRef } from "vue";

import { Store } from "@/display/store";
import {
  AppIcon,
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
        data-test="sidebar-folders"
        @click="handleClickPage('folders')"
      >
        <AppIcon name="directories" />
      </SideItem>
      <SideItem
        id="calendar"
        :title="t('common.calendar')"
        data-test="sidebar-calendar"
        @click="handleClickPage('calendar')"
      >
        <AppIcon name="calendar" />
      </SideItem>
      <SideItem
        id="tags"
        :title="t('common.tags')"
        data-test="sidebar-tags"
        @click="handleClickPage('tags')"
      >
        <AppIcon name="tag" />
      </SideItem>
      <SideItem
        id="priority"
        :title="t('common.priority')"
        data-test="sidebar-priority"
        @click="handleClickPage('priority')"
      >
        <AppIcon name="flag" />
      </SideItem>
      <SideItem
        id="search"
        :title="t('common.search')"
        data-test="sidebar-search"
        @click="handleClickPage('search')"
      >
        <AppIcon name="search" />
      </SideItem>
    </template>
    <template #bottom>
      <SideItem
        v-if="preloading"
        id="preloading"
        disabled
        :title="t('dashboard.preloading')"
        data-test="sidebar-preloading"
        class="sidebar-preload"
      >
        <AppIcon
          name="spinner"
          animation="spin"
          :duration="7"
        />
      </SideItem>
      <SideItem
        id="exit"
        :title="t('exit')"
        data-test="sidebar-exit"
        @click="handleExit"
      >
        <AppIcon name="sign-out" />
      </SideItem>
    </template>
  </SideBar>
</template>
