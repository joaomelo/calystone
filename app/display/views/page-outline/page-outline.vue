<script setup lang="ts">
import { OutlineArtifacts, SplitterPanel } from "@/display/widgets";
import { Store } from "@/domain";
import { treeify } from "@/utils";
import { computed } from "vue";

const store = Store.use();
const artifacts = computed(() => treeify(store.artifacts.hash));
</script>

<template>
  <SplitterPanel class="page-outline">
    <template #start>
      <OutlineArtifacts
        :artifacts="artifacts"
        :is-loading="store.artifacts.isLoading"
        class="page-outline-start"
      />
    </template>
    <template #end>
      <pre>content</pre>
    </template>
  </SplitterPanel>
</template>
<style scoped>
.page-outline {
  height: 100vh;
}
</style>