<script setup>
import { ListBase } from "../../../lib";
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>
<template>
  <list-base :items="items">
    <template #content="{ item }">
      <p>{{ item.title }}</p>
    </template>
  </list-base>
</template>
