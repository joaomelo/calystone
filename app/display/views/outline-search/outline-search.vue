<script setup lang="ts">
import type { ItemData } from "@/display/views/outline-item";
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { OutlineItems } from "@/display/views/outline-items";
import { debounce, InputText, ScrollPanel } from "@/utils";
import { ref } from "vue";

import { useItems } from "./use-items";

const emit = defineEmits<{
  "selected": [node: Node | undefined]
}>();

const { services } = Store.use();

const search = ref<string>("");
const items = useItems(search);

const handleSearch = debounce((text?: string) => {
  search.value = text ?? "";
});

function handleSelected(data?: ItemData) {
  if (!data) {
    emit("selected", undefined);
    return;
  };

  const node = services.retrieveNodes.get(data.key);
  emit("selected", node);
}
</script>
<template>
  <ScrollPanel>
    <div class="outline-search">
      <div class="outline-search__input-wrapper">
        <InputText
          autofocus
          data-test="outline-search__input"
          @update:model-value="handleSearch"
        />
      </div>
      <OutlineItems
        data-test="outline-search__results"
        :items="items"
        mode="list"
        @selected="handleSelected"
      />
    </div>
  </ScrollPanel>
</template>
<style scoped>
.outline-search {
  display: flex;
  flex-direction: column;
}

.outline-search__input-wrapper {
  padding-inline: var(--size-3);
  padding-block-start: var(--size-3);
}
</style>
