<script setup lang="ts">
import type { Item, ItemAction } from "./item";

import ListItem from "./list-item.vue";

type Props = {
  items: Item[];
};
defineProps<Props>();

type Emits = {
  itemAction: [value: ItemAction];
};
defineEmits<Emits>();
</script>
<template>
  <div class="list-base">
    <template v-for="item in items" :key="item.value">
      <list-item :item="item" @action="$emit('itemAction', $event)" />
    </template>
  </div>
</template>
