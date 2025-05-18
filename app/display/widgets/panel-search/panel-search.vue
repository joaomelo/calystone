<script setup lang="ts">
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { OutlineItem } from "@/display/widgets/outline-item";
import { debounce, InputText, ScrollPanel } from "@/utils";
import { ref } from "vue";

const emit = defineEmits<{
  "selected": [id: Node | undefined]
}>();

const { services } = Store.use();

const searchedNodes = ref<Node[]>([]);
const selectedNode = ref<Node | undefined>(undefined);

const handleSearch = debounce((text?: string) => {
  searchedNodes.value = text ? services.searchNodes.search(text) : [];
});

function handleSelect(node: Node) {
  selectedNode.value = selectedNode.value?.isEqualTo(node) ? undefined : node;
  emit("selected", selectedNode.value);
}
</script>
<template>
  <ScrollPanel>
    <div class="panel-search">
      <div>
        <InputText
          autofocus
          data-test="input-search"
          @update:model-value="handleSearch"
        />
      </div>
      <ul
        class="panel-search__results"
        data-test="search-results"
      >
        <li
          v-for="node in searchedNodes"
          :key="node.id"
          class="panel-search__result-item"
          :class="{ 'selected': selectedNode?.isEqualTo(node) }"
          @click="handleSelect(node)"
        >
          <OutlineItem :item="{ key: node.id, type: 'node' }" />
        </li>
      </ul>
    </div>
  </ScrollPanel>
</template>
<style scoped>
.panel-search {
  padding: var(--size-3);
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}

.panel-search__results {
  display: flex;
  flex-direction: column;
  gap: var(--size-1);
}

.panel-search__result-item {
  padding: var(--size-1);
  border-radius: var(--radius-2);
  cursor: pointer;

  &:hover {
    background-color: var(--p-content-hover-background);
  }

  &.selected {
    background-color: var(--p-highlight-background);
    color: var(--p-highlight-color);
  }
}
</style>
