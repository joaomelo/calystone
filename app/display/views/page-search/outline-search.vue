<script setup lang="ts">
import type { OutlineGridKeys } from "@/utils";

import { OutlineItem } from "@/display/views/outline-item";
import { OutlineItems } from "@/display/views/outline-items";
import {
  debounce,
  InputText
} from "@/utils";
import { ref } from "vue";

import { useItems } from "./use-items";

const selectedKeys = defineModel<OutlineGridKeys>("selectedKeys", { default: () => ({}) });

const search = ref<string>("");
const items = useItems(search);

const handleSearch = debounce((text?: string) => {
  search.value = text ?? "";
});
</script>
<template>
  <div class="outline-search">
    <div class="outline-search__input-wrapper">
      <InputText
        autofocus
        data-test="outline-search__input"
        @update:model-value="handleSearch"
      />
    </div>
    <OutlineItems
      v-model:selected-keys="selectedKeys"
      data-test="outline-search__results"
      :items="items"
      display-mode="list"
    >
      <template #default="{ itemData }">
        <OutlineItem :data="itemData" />
      </template>
    </OutlineItems>
  </div>
</template>
<style scoped>
.outline-search {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.outline-search__input-wrapper {
  padding-inline: var(--size-3);
  padding-block-start: var(--size-3);
}
</style>
