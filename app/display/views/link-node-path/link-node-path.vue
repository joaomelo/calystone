<script setup lang="ts">
import { useRoute } from "vue-router";

defineProps<{
  id: string
  path: string
}>();

const route = useRoute();
</script>
<template>
  <router-link
    :to="{
      name: 'folders',
      query: { ...route.query, 'folders-selected': id }
    }"
  >
    {{ path }}
  </router-link>
</template>