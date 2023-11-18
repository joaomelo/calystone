<script setup>
import ListItem from "./list-item.vue";

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
defineEmits("action");
</script>
<template>
  <div class="list-base">
    <template v-for="item in items" :key="item.value">
      <list-item :item="item" @action="$emit('action', $event)" />
    </template>
  </div>
</template>
