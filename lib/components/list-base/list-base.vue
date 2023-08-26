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
  <div>
    <div v-for="item in items" :key="item.id">
      <list-base-item :item="item">
        <template #content="{ item }">
          <slot name="content" :item="item"></slot>
        </template>
        <template #aside="{ item }">
          <slot name="aside" :item="item"></slot>
        </template>
      </list-base-item>
    </div>
  </div>
</template>
