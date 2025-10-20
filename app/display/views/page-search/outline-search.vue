<script setup lang="ts">
import { ref } from "vue";

import type { OutlineGridKeys } from "@/display/affordances/outline-grid";

import { InputText } from "@/display/affordances/input-text";
import { OutlineNodes } from "@/display/views/outline-nodes";
import {
  OutlineBinary,
  OutlineDirectory,
  OutlineText,
  OutlineTodo
} from "@/display/views/outlines-node";
import {
  Directory,
  TextArtifact,
  TodoArtifact
} from "@/domain";
import { debounce } from "@/utils";

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
    <OutlineNodes
      v-model:selected-keys="selectedKeys"
      data-test="outline-search__results"
      display-mode="list"
      :items="items"
    >
      <template #default="{ node }">
        <OutlineDirectory
          v-if="(node instanceof Directory)"
          :directory="node"
        />
        <OutlineText
          v-else-if="(node instanceof TextArtifact)"
          :text="node"
        />
        <OutlineTodo
          v-else-if="(node instanceof TodoArtifact)"
          :todo="node"
        />
        <OutlineBinary
          v-else
          :binary="node"
        />
      </template>
    </OutlineNodes>
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
