<script setup lang="ts">
import { FrameDashboard } from "@display";
import { ACTIVITIES, type Activity, isActivity } from "@domain";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const active = computed(() => {
  if (!route.name) return ACTIVITIES.OUTLINE;
  if (typeof route.name === "symbol") return ACTIVITIES.OUTLINE;
  if (isActivity(route.name)) return route.name;
  return ACTIVITIES.OUTLINE;
});

function handleUpdateActive(name: Activity) {
  void router.push({ name });
}
</script>
<template>
  <FrameDashboard
    :active="active"
    @update:active="handleUpdateActive"
  />
</template>