<script setup lang="ts">
import { ACTIVITIES, type Activity, isActivity } from "@/display/activities";
import { useI18n } from "@/display/i18n";
import { SideBar, SideItem } from "@/display/widgets";

defineProps<{
  active: Activity
}>();
const emit = defineEmits<{
  "update:activity": [activity: Activity]
}>();
const { t } = useI18n();

function handleUpdateActivity(active: string) {
  if (isActivity(active)) emit("update:activity", active);
}
</script>
<template>
  <SideBar
    :active="active"
    @update:activity="handleUpdateActivity"
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
