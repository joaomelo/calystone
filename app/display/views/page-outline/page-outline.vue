<script setup lang="ts">
import { ScrollPanel, SplitterPanel, TreeArtifacts } from "@/display/widgets";
import { type Artifact } from "@/domain";
import { type Tree } from "@/utils";
import { type MaybeRefOrGetter } from "vue";

const { artifacts } = defineProps<{
  artifacts: MaybeRefOrGetter<Tree<Artifact>>;
}>();
</script>

<template>
  <SplitterPanel class="page-outline">
    <template #start>
      <ScrollPanel class="page-outline-start">
        <TreeArtifacts
          :artifacts="artifacts"
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