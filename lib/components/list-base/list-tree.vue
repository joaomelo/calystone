<script setup>
import { toRef } from "vue";

import { COLLAPSE_STATUSES, useCollapse } from "./collapse";
import CollapseSwitch from "./collapse-switch.vue";
import ListItem from "./list-item.vue";

const props = defineProps({
  draggable: {
    default: false,
    type: Boolean,
  },
  editable: {
    default: false,
    type: Boolean,
  },
  root: {
    default: () => ({}),
    type: Object,
  },
});
defineEmits(["drag"]);

const { collapse, collapseForDragEnd, collapseForDragStart } = useCollapse(
  toRef(props, "root"),
);
</script>
<template>
  <div class="list-tree">
    <div class="list-tree-root">
      <collapse-switch v-model="collapse" />
      <list-item
        :item="root"
        :draggable="draggable"
        @drag-start="collapseForDragStart"
        @drag-end="collapseForDragEnd"
        @drag="$emit('drag', $event)"
      >
        <template #item="slotProps">
          <slot
            name="item"
            v-bind="slotProps"
          />
        </template>
      </list-item>
    </div>
    <template v-if="collapse === COLLAPSE_STATUSES.OPEN">
      <div class="list-tree-children">
        <template
          v-for="child in root.children"
          :key="child.value"
        >
          <list-tree
            :root="child"
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
  </div>
</template>
<style scoped>
.list-tree-root {
  display: flex;
  align-items: center;
}

.list-tree-children {
  padding-inline-start: var(--size-20);
}
</style>
