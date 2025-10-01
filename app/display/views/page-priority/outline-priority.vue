<script setup lang="ts">
import type { OutlineGridKeys } from "@/utils";

import { OutlineNodes } from "@/display/views/outline-nodes";
import { OutlinePriority } from "@/display/views/outlines-node";
import { SelectCriterion } from "@/display/views/select-criterion";
import { SelectTag } from "@/display/views/select-tag";
import { ref } from "vue";

import type { Filters } from "./filters";

import { useItems } from "./use-items";

const selectedKeys = defineModel<OutlineGridKeys>("selectedKeys", { default: () => ({}) });

const filters = ref<Filters>({});
const items = useItems(filters);
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
      display-mode="list"
      :items="items"
    >
      <template #default="{ node }">
        <OutlinePriority :todo="node" />
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