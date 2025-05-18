<script setup lang="ts">
import type { Node } from "@/domain";

import { debounce, InputText, ScrollPanel } from "@/utils";
import { ref } from "vue";

const results = ref<Node[]>([]);

const handleSearch = debounce((text?: string) => {
  console.log(text);
});
</script>
<template>
  <ScrollPanel>
    <div class="panel-search">
      <div>
        <InputText
          autofocus
          data-test="input-name"
          @update:model-value="handleSearch"
        />
      </div>
      <div>
        <div
          v-for="result in results"
          :key="result.id"
        >
          {{ result.name }}
        </div>
      </div>
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
</style>
