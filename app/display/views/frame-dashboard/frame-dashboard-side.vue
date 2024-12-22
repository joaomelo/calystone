<script setup lang="ts">
import { activities, isActivity } from "@/display/activities";
import { useI18n } from "@/display/i18n";
import { State } from "@/display/state";
import { SideBar, SideItem } from "@/display/widgets";
import { computed } from "vue";
import { useRouter } from "vue-router";

const { t } = useI18n();
const state = State.use();

const router = useRouter();

const refresh = computed(() => state.nodes.value?.loading
  ? { disabled: true, icon: "pi pi-spin pi-spinner", title: "loading" }
  : { disabled: false, icon: "pi pi-sync", title: "reload" }
);

function handleUpdateActive(active: string) {
  if (!isActivity(active)) return;
  if (active === state.activity.value) return;

  if (active === activities.open) {
    state.updateNodes(undefined);
    return;
  }

  if (active === activities.reload) {
    void state.nodes.value?.load();
    return;
  }

  void router.push({ name: active });
}
</script>
<template>
  <SideBar
    :active="state.activity.value"
    @update:active="handleUpdateActive"
  >
    <template #default>
      <SideItem
        :id="activities.outline"
        :title="t(activities.outline)"
        icon="pi pi-list-check"
      />
      <SideItem
        :id="activities.preferences"
        icon="pi pi-cog"
        :title="t(activities.preferences)"
      />
    </template>
    <template #bottom>
      <SideItem
        :id="activities.reload"
        :icon="refresh.icon"
        :title="t(refresh.title)"
        :disabled="refresh.disabled"
      />
      <SideItem
        :id="activities.open"
        icon="pi pi-sign-out"
        :title="t('exit')"
      />
    </template>
  </SideBar>
</template>
