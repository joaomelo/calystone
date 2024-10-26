<script setup lang="ts">
import { ACTIVITIES, type Activity, DEFAULT_ACTIVITY, FrameDashboard, isActivity } from "@/display";
import { Store } from "@/domain";
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const store = Store.use();

watch(
  () => store.artifacts.source.value === undefined,
  (isEmpty) => {
    if (isEmpty) {
      void router.push({ name: ACTIVITIES.OPEN });
    }
  },
  { immediate: true }
);

const currentActivity = computed(() => {
  if (!route.name) return DEFAULT_ACTIVITY;
  if (typeof route.name === "symbol") return DEFAULT_ACTIVITY;
  if (isActivity(route.name)) return route.name;
  return DEFAULT_ACTIVITY;
});

function handleUpdateActivity(newActivity: Activity) {
  if (newActivity === ACTIVITIES.OPEN) {
    store.artifacts.close();
    return;
  }
  void router.push({ name: newActivity });
}
</script>
<template>
  <FrameDashboard
    :activity="currentActivity"
    @update:activity="handleUpdateActivity"
  />
</template>