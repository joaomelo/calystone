<script setup lang="ts">
import type { TodosFilters } from "@/display/views/use-todos";
import type { OutlineGridKeys } from "@/utils";

import { OutlineItem } from "@/display/views/outline-item";
import { OutlineItems } from "@/display/views/outline-items";
import { SelectTag } from "@/display/views/select-tag";
import { useTodos } from "@/display/views/use-todos";
import { ref } from "vue";

const selectedKeys = defineModel<OutlineGridKeys>("selectedKeys", { default: () => ({}) });

const filters = ref<TodosFilters>({});
const items = useTodos(filters);
</script>
<template>
  <div class="outline-tags">
    <div class="outline-tags__filters">
      <SelectTag v-model="filters.tag" />
    </div>
    <OutlineItems
      v-model:selected-keys="selectedKeys"
      data-test="outline-tags__items"
      :items="items"
      mode="list"
    >
      <template #default="{ itemData }">
        <OutlineItem :data="itemData" />
      </template>
    </OutlineItems>
  </div>
</template>
<style scoped>
.outline-tags {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.outline-tags__filters {
  padding: var(--size-3);

  display: flex;
  flex-direction: column;
  gap: var(--size-2);
}
</style>