<script setup>
import ListItem from "./list-item.vue";

defineProps({
  items: { type: Array, default: () => [] },
  draggableItems: { type: Boolean, default: false },
});
defineEmits(["action", "drag"]);
</script>
<template>
  <div>
    <template v-for="item in items" :key="item.value">
      <list-item
        :item="item"
        :draggable="draggableItems"
        @action="$emit('action', $event)"
        @drag="$emit('drag', $event)"
      />
    </template>
  </div>
</template>
