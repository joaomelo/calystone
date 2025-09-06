<script setup lang="ts">
import type { BinaryArtifact } from "@/domain";

import { AppIcon } from "@/utils";
import { computed } from "vue";

import { OutlineNode } from "../outline-node";

const { binary } = defineProps<{ binary: BinaryArtifact; }>();

const animation = computed(() => {
  return binary.isBusy() ? "pulse" : "none";
});

const name = computed(() => {
  return binary.isLoaded() ? "file" : "file-dashed";
});
</script>
<template>
  <OutlineNode :node="binary">
    <template #icon>
      <AppIcon
        :name="name"
        :animation="animation"
      />
    </template>
  </OutlineNode>
</template>
