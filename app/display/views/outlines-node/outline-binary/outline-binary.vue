<script setup lang="ts">
import { computed } from "vue";

import type { BinaryArtifact } from "@/domain";

import { AppIcon } from "@/display/affordances/icons";

import { OutlineNode } from "../outline-node";

const { binary } = defineProps<{ binary: BinaryArtifact; }>();

const animation = computed(() => {
  return binary.isBusy() ? "pulse" : "none";
});

const name = computed(() => {
  if (binary.isUnloaded()) return "file-dashed";
  if (binary.mime.subtype() === "pdf") return "file-pdf";
  return "file";
});
</script>
<template>
  <OutlineNode :node="binary">
    <template #icon>
      <AppIcon
        :animation="animation"
        :name="name"
      />
    </template>
  </OutlineNode>
</template>
