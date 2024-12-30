<script setup lang="ts">
import { activities, isActivity } from "@/display/activities";
import { useI18n } from "@/display/i18n";
import { Store } from "@/display/store";
import { SideBar, SideItem } from "@/display/widgets";
import { computed } from "vue";
import { useRouter } from "vue-router";

const { t } = useI18n();
const state = Store.use();

const router = useRouter();

const baseIcon = "bx bx-md";
const refresh = computed(() => {
  const value = state.nodes.loading
    ? { disabled: true, icon: "bx-loader bx-spin", title: "loading" }
    : { disabled: false, icon: "bx-sync", title: "reload" };
  return value;
});

function handleUpdateActive(active: string) {
  if (!isActivity(active)) return;
  if (active === state.activity) return;

  if (active === activities.open) {
    state.nodes.disconnect();
    return;
  }

  if (active === activities.reload) {
    void state.nodes.load();
    return;
  }

  void router.push({ name: active });
}
</script>
<template>
  <SideBar
    :active="state.activity"
    @update:active="handleUpdateActive"
  >
    <template #default>
      <SideItem
        :id="activities.outline"
        :title="t(activities.outline)"
        :icon="`${baseIcon} bx-list-ul`"
      />
    </template>
    <template #bottom>
      <SideItem
        :id="activities.reload"
        :icon="`${baseIcon} ${refresh.icon}`"
        :title="t(refresh.title)"
        :disabled="refresh.disabled"
      />
      <SideItem
        :id="activities.open"
        :icon="`${baseIcon} bx-log-out`"
        :title="t('exit')"
      />
    </template>
  </SideBar>
</template>
