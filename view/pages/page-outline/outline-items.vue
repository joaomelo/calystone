<script setup>
import { toRef } from "vue";
import { ListBase } from "@lib";
import { useItems } from "./outline-items-items";
import { useDrag } from "./outline-items-drag";

const props = defineProps({
  parentId: {
    type: String,
    default: null,
  },
});

const items = useItems(toRef(props, "parentId"));
const handleDrag = useDrag();
</script>
<template>
  <list-base :items="items" draggable @drag="handleDrag">
    <template #item="slotProps">
      <slot name="item" v-bind="slotProps"></slot>
    </template>
  </list-base>
</template>
