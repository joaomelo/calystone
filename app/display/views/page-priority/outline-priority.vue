<script setup lang="ts">
import type { TodosFilters } from "@/display/views/use-todos";
import type { OutlineGridKeys } from "@/utils";

import { OutlineItem } from "@/display/views/outline-item";
import { OutlineNodes } from "@/display/views/outline-nodes";
import { SelectCriterion } from "@/display/views/select-criterion";
import { SelectTag } from "@/display/views/select-tag";
import { useTodos } from "@/display/views/use-todos";
import { ref } from "vue";

const selectedKeys = defineModel<OutlineGridKeys>("selectedKeys", { default: () => ({}) });

const filters = ref<TodosFilters>({});
const items = useTodos(filters);
</script>
<template>
  <div class="outline-priority">
    <div class="outline-priority__filters">
      <SelectTag v-model="filters.tag" />
      <SelectCriterion v-model="filters.criterion" />
    </div>
    <OutlineNodes
      v-model:selected-keys="selectedKeys"
      data-test="outline-priority__items"
      :items="items"
      display-mode="list"
    >
      <template #default="{ itemData }">
        <OutlineItem :data="itemData" />
      </template>
    </OutlineNodes>
  </div>
</template>
<style scoped>
.outline-priority {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.outline-priority__filters {
  padding: var(--size-3);

  display: flex;
  flex-direction: column;
  gap: var(--size-2);
}
</style>