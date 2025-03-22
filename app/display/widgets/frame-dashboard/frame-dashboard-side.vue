<script setup lang="ts">
import type { ComputedRef } from "vue";

import { Store } from "@/display/store";
import { SideBar, SideItem, useI18n } from "@/utils";
import { computed } from "vue";
import { useRoute } from "vue-router";

const { t } = useI18n();
const { service } = Store.use();

const route = useRoute();

const baseIcon = "bx bx-md";

const active: ComputedRef<string> = computed(() => {
  if (typeof route.name === "string") return route.name;
  return "outline";
});

function handleExit() {
  service.connection.disconnect();
}

function handleReload() {
  service.connection.reconnect();
}
</script>
<template>
  <SideBar :active="active">
    <template #default>
      <SideItem
        id="outline"
        :title="t('outline')"
        :icon="`${baseIcon} bx-list-ul`"
        data-test="outline"
      />
    </template>
    <template #bottom>
      <SideItem
        id="reload"
        :icon="`${baseIcon} bx-sync`"
        :title="t('reload')"
        data-test="reload"
        @click="handleReload"
      />
      <SideItem
        id="exit"
        :icon="`${baseIcon} bx-log-out`"
        :title="t('exit')"
        data-test="exit"
        @click="handleExit"
      />
    </template>
  </SideBar>
</template>
