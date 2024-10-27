<script setup lang="ts">
import { ScrollPanel, SplitterPanel, TreeArtifacts } from "@/display/widgets";
import { Store } from "@/domain";
import { treeify } from "@/utils";
import { computed } from "vue";

const store = Store.use();
const artifacts = computed(() => treeify(store.artifacts.hash));
</script>

<template>
  <SplitterPanel class="page-outline">
    <template #start>
      <ScrollPanel class="page-outline-start">
        <TreeArtifacts
          :artifacts="artifacts"
          :is-loading="true"
        />
      </ScrollPanel>
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

.page-outline-start {
  height: 100vh;
}
</style>