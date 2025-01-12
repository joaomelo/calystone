<script setup lang="ts">
import { activities, isActivity } from "@/display/activities";
import { useI18n } from "@/display/i18n";
import { Store } from "@/display/store";
import { SideBar, SideItem } from "@/display/widgets";
import { useRouter } from "vue-router";

const { t } = useI18n();
const store = Store.use();

const router = useRouter();

const baseIcon = "bx bx-md";

function handleUpdateActive(active: string) {
  if (!isActivity(active)) return;
  if (active === store.activity.value) return;

  if (active === activities.open) {
    store.nodesService.exit();
    return;
  }

  if (active === activities.reload) {
    store.nodes.reconnect();
    return;
  }

  void router.push({ name: active });
}
</script>
<template>
  <SideBar
    :active="store.activity.value"
    @update:active="handleUpdateActive"
  >
    <template #default>
      <SideItem
        :id="activities.outline"
        :title="t(activities.outline)"
        :icon="`${baseIcon} bx-list-ul`"
        data-test="outline"
      />
    </template>
    <template #bottom>
      <SideItem
        :id="activities.reload"
        :icon="`${baseIcon} bx-sync`"
        :title="t('reload')"
        data-test="reload"
      />
      <SideItem
        :id="activities.open"
        :icon="`${baseIcon} bx-log-out`"
        :title="t('exit')"
        data-test="exit"
      />
    </template>
  </SideBar>
</template>
