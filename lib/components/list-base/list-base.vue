<script setup>
import ListTree from "./list-tree.vue";

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  editable: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["action", "drag", "edit"]);
</script>
<template>
  <div>
    <template v-for="item in items" :key="item.value">
      <list-tree
        :root="item"
        :draggable="draggable"
        :editable="editable"
        @action="$emit('action', $event)"
        @drag="$emit('drag', $event)"
        @edit="$emit('edit', $event)"
      />
    </template>
  </div>
</template>
