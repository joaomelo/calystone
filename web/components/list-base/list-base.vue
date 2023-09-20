<script setup>
import ListBaseItem from "./list-base-item.vue";
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
defineEmits(["action"]);
</script>
<template>
  <div class="list-base">
    <template v-for="item in items" :key="item.id">
      <list-base-item :item="item" @action="$emit('action', $event)" />
    </template>
  </div>
</template>
