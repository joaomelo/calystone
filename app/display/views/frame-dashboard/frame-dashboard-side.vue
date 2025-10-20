<script setup lang="ts">
import type { ComputedRef } from "vue";

import { computed } from "vue";
import {
  useRoute,
  useRouter
} from "vue-router";

import { useI18n } from "@/display/affordances/i18n";
import { AppIcon } from "@/display/affordances/icons";
import {
  SideBar,
  SideItem
} from "@/display/affordances/side-bar";
import { Store } from "@/display/store";

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
        data-test="sidebar-folders"
        :title="t('common.folders')"
        @click="handleClickPage('folders')"
      >
        <AppIcon name="directories" />
      </SideItem>
      <SideItem
        id="calendar"
        data-test="sidebar-calendar"
        :title="t('common.calendar')"
        @click="handleClickPage('calendar')"
      >
        <AppIcon name="calendar" />
      </SideItem>
      <SideItem
        id="tags"
        data-test="sidebar-tags"
        :title="t('common.tags')"
        @click="handleClickPage('tags')"
      >
        <AppIcon name="tag" />
      </SideItem>
      <SideItem
        id="priority"
        data-test="sidebar-priority"
        :title="t('common.priority')"
        @click="handleClickPage('priority')"
      >
        <AppIcon name="flag" />
      </SideItem>
      <SideItem
        id="search"
        data-test="sidebar-search"
        :title="t('common.search')"
        @click="handleClickPage('search')"
      >
        <AppIcon name="search" />
      </SideItem>
    </template>
    <template #bottom>
      <SideItem
        v-if="preloading"
        id="preloading"
        class="sidebar-preload"
        data-test="sidebar-preloading"
        disabled
        :title="t('dashboard.preloading')"
      >
        <AppIcon
          animation="spin"
          :duration="7"
          name="spinner"
        />
      </SideItem>
      <SideItem
        id="exit"
        data-test="sidebar-exit"
        :title="t('exit')"
        @click="handleExit"
      >
        <AppIcon name="sign-out" />
      </SideItem>
    </template>
  </SideBar>
</template>
