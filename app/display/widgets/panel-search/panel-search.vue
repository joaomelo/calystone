<script setup lang="ts">
import { debounce, InputText, ScrollPanel } from "@/utils";

const handleUpdate = debounce(async (text: string) => {
  artifact.fromString(text);
  await services.exchangeArtifact.postFrom(artifact);
}, 1000);
</script>
<template>
  <ScrollPanel>
    <div class="panel-search">
      <div>
        <InputText
          autofocus
          data-test="input-name"
        />
      </div>
      <div>results</div>
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
