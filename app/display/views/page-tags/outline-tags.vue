<script setup lang="ts">
import type { OutlineGridKeys } from "@/utils";

import { OutlineNodes } from "@/display/views/outline-nodes";
import { OutlineTodo } from "@/display/views/outlines-node";
import { SelectTag } from "@/display/views/select-tag";
import { ref } from "vue";

import { useItems } from "./use-items";

const selectedKeys = defineModel<OutlineGridKeys>("selectedKeys", { default: () => ({}) });

const tag = ref<string>("");
const items = useItems(tag);
</script>
<template>
  <div class="outline-tags">
    <div class="outline-tags__filters">
      <SelectTag v-model="tag" />
    </div>
    <OutlineNodes
      v-model:selected-keys="selectedKeys"
      data-test="outline-tags-items"
      :items="items"
      display-mode="list"
    >
      <template #default="{ node }">
        <OutlineTodo :todo="node" />
      </template>
    </OutlineNodes>
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