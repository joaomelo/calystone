<script setup>
import { toRef } from "vue";
import { COLLAPSE_STATUSES, useCollapse } from "./collapse";
import CollapseSwitch from "./collapse-switch.vue";
import ListItem from "./list-item.vue";

const props = defineProps({
  root: { type: Object, default: () => ({}) },
  draggable: { type: Boolean, default: false },
});
defineEmits(["action", "drag"]);

const collapse = useCollapse(toRef(props, "root"));
</script>
<template>
  <div class="list-tree">
    <div class="list-item-wrapper">
      <collapse-switch v-model="collapse" />
      <list-item
        :item="root"
        :draggable="draggable"
        @action="$emit('action', $event)"
        @drag="$emit('drag', $event)"
      />
    </div>
    <template v-if="collapse === COLLAPSE_STATUSES.OPEN">
      <div class="list-tree-children">
        <template v-for="child in root.children" :key="child.value">
          <list-tree
            :root="child"
            :draggable="draggable"
            @action="$emit('action', $event)"
            @drag="$emit('drag', $event)"
          />
        </template>
      </div>
    </template>
  </div>
</template>
<style scoped>
.list-tree-children {
  padding-inline-start: var(--size-20);
}
.list-item-wrapper {
  display: flex;
  align-items: center;
}
</style>
