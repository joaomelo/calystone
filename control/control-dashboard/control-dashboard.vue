<script setup lang="ts">
import { clearRoot, useStore } from "@data";
import { FrameDashboard } from "@display";
import { ACTIVITIES, type Activity, isActivity } from "@domain";
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const store = useStore();

watch(
  () => store.root,
  (root) => {
    if (root.value === undefined) {
      void router.push({ name: ACTIVITIES.OPEN });
    }
  },
  { immediate: true }
);

const active = computed(() => {
  if (!route.name) return ACTIVITIES.OUTLINE;
  if (typeof route.name === "symbol") return ACTIVITIES.OUTLINE;
  if (isActivity(route.name)) return route.name;
  return ACTIVITIES.OUTLINE;
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
    :active="active"
    @update:active="handleUpdateActive"
  />
</template>