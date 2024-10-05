<script setup lang="ts">
import { useI18n } from "@display/i18n";
import { ACTIVITIES, type Activity, isActivity } from "@domain";
import { SideBar, SideItem } from "@lib";

defineProps<{
  active: Activity
}>();
const emit = defineEmits<{
  "update:active": [active: Activity]
}>();
const { t } = useI18n();

function handleUpdateActive(active: string) {
  if (isActivity(active)) emit("update:active", active);
}
</script>
<template>
  <SideBar
    :active="active"
    @update:active="handleUpdateActive"
  >
    <template #default>
      <SideItem
        :id="ACTIVITIES.OUTLINE"
        :title="t(ACTIVITIES.OUTLINE)"
        icon="list-check"
      />
      <SideItem
        :id="ACTIVITIES.TAGS"
        icon="tags"
        :title="t(ACTIVITIES.TAGS)"
      />
      <SideItem
        :id="ACTIVITIES.SEARCH"
        icon="search"
        :title="t(ACTIVITIES.SEARCH)"
      />
      <SideItem
        :id="ACTIVITIES.PREFERENCES"
        icon="cog"
        :title="t(ACTIVITIES.PREFERENCES)"
      />
    </template>
    <template #bottom>
      <SideItem
        :id="ACTIVITIES.OPEN"
        icon="sign-out"
        :title="t('exit')"
      />
    </template>
  </SideBar>
</template>
