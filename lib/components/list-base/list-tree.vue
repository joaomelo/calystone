<script setup>
import { toRef } from "vue";
import { hasElements, ActionsMenu } from "@lib";
import { COLLAPSE_STATUSES, useCollapse } from "./collapse";
import CollapseSwitch from "./collapse-switch.vue";
import ListItem from "./list-item.vue";

const props = defineProps({
  root: {
    type: Object,
    default: () => ({}),
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

const { collapse, handleStart, handleEnd } = useCollapse(toRef(props, "root"));
</script>
<template>
  <div class="list-tree">
    <div class="list-root-wrapper">
      <collapse-switch v-model="collapse" />
      <list-item
        :item="root"
        :draggable="draggable"
        :editable="editable"
        @drag-start="handleStart"
        @drag-end="handleEnd"
        @action="$emit('action', $event)"
        @drag="$emit('drag', $event)"
        @edit="$emit('edit', $event)"
      />
      <template v-if="hasElements(root.actions)">
        <actions-menu
          :actions="root.actions"
          @action="$emit('action', { item: root.value, action: $event })"
        />
      </template>
    </div>
    <template v-if="collapse === COLLAPSE_STATUSES.OPEN">
      <div class="list-tree-children">
        <template v-for="child in root.children" :key="child.value">
          <list-tree
            :root="child"
            :draggable="draggable"
            :editable="editable"
            @action="$emit('action', $event)"
            @drag="$emit('drag', $event)"
            @edit="$emit('edit', $event)"
          />
        </template>
      </div>
    </template>
  </div>
</template>
<style scoped>
.list-root-wrapper {
  display: flex;
  align-items: center;
}

.list-tree-children {
  padding-inline-start: var(--size-20);
}
</style>
