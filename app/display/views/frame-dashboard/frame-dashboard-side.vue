<script setup lang="ts">
import { ACTIVITIES, isActivity, useCurrentActivity } from "@/display/activities";
import { useI18n } from "@/display/i18n";
import { Store } from "@/display/store";
import { SideBar, SideItem } from "@/display/widgets";
import { computed } from "vue";
import { useRouter } from "vue-router";

const { t } = useI18n();
const { nodes } = Store.use();
const activity = useCurrentActivity();
const router = useRouter();

const refresh = computed(() => nodes.loading
  ? { disabled: true, icon: "pi pi-spin pi-spinner", title: "loading" }
  : { disabled: false, icon: "pi pi-sync", title: "reload" }
);

function handleUpdateActive(active: string) {
  if (!isActivity(active)) return;
  if (active === activity.value) return;

  if (active === ACTIVITIES.OPEN) {
    nodes.disconnect();
    return;
  }

  if (active === ACTIVITIES.RELOAD) {
    void nodes.load();
    return;
  }

  void router.push({ name: active });
}
</script>
<template>
  <SideBar
    :active="activity"
    @update:active="handleUpdateActive"
  >
    <template #default>
      <SideItem
        :id="ACTIVITIES.OUTLINE"
        :title="t(ACTIVITIES.OUTLINE)"
        icon="pi pi-list-check"
      />
    </template>
    <template #bottom>
      <SideItem
        :id="ACTIVITIES.RELOAD"
        :icon="refresh.icon"
        :title="t(refresh.title)"
        :disabled="refresh.disabled"
      />
      <SideItem
        :id="ACTIVITIES.OPEN"
        icon="pi pi-sign-out"
        :title="t('exit')"
      />
    </template>
  </SideBar>
</template>
