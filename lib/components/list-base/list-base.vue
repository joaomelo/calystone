<script setup>
import ListTree from "./list-tree.vue";

defineProps({
  items: { type: Array, default: () => [] },
  draggable: { type: Boolean, default: false },
});
defineEmits(["action", "drag"]);
</script>
<template>
  <div>
    <template v-for="item in items" :key="item.value">
      <list-tree
        :root="item"
        :draggable="draggable"
        @action="$emit('action', $event)"
        @drag="$emit('drag', $event)"
      />
    </template>
  </div>
</template>
