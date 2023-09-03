<script setup>
import ListBaseItem from "./list-base-item.vue";
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>
<template>
  <div class="list-base">
    <template v-for="item in items" :key="item.id">
      <list-base-item :item="item" />
    </template>
  </div>
</template>
