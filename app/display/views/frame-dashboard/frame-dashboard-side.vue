<script setup lang="ts">
import { ACTIVITIES, type Activity, isActivity } from "@/display/activities";
import { useI18n } from "@/display/i18n";
import { SideBar, SideItem } from "@/display/widgets";

const { activity } = defineProps<{
  activity: Activity
}>();
const emit = defineEmits<{
  "update:activity": [activity: Activity]
}>();
const { t } = useI18n();

function handleUpdateActive(active: string) {
  if (isActivity(active) && active !== activity)
    emit("update:activity", active);
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
        icon="list-check"
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
