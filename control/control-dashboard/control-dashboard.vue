<script setup lang="ts">
import { clearRoot, useStore } from "@data";
import { FrameDashboard } from "@display";
import { ACTIVITIES, type Activity, DEFAULT_ACTIVITY, isActivity } from "@domain";
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const store = useStore();

watch(
  () => store.root.value,
  (root) => {
    if (root === undefined) {
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

function handleUpdateActive(name: Activity) {
  if (name === ACTIVITIES.OPEN) {
    clearRoot(store);
    return;
  }
  void router.push({ name });
}
</script>
<template>
  <FrameDashboard
    :active="currentActivity"
    @update:active="handleUpdateActive"
  />
</template>