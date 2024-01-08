<script setup>
import ListTree from "./list-tree.vue";

defineProps({
  draggable: {
    default: false,
    type: Boolean,
  },
  items: {
    default: () => [],
    type: Array,
  },
});
defineEmits(["drag"]);
</script>
<template>
  <div class="list-base">
    <template
      v-for="item in items"
      :key="item.value"
    >
      <list-tree
        :root="item"
        :draggable="draggable"
        @drag="$emit('drag', $event)"
      >
        <template #item="slotProps">
          <slot
            name="item"
            v-bind="slotProps"
          />
        </template>
      </list-tree>
    </template>
  </div>
</template>
