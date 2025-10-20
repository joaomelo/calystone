<script setup lang="ts">
import { computed } from "vue";

import type { Directory } from "@/domain";

import { AppIcon } from "@/display/affordances/icons";

import { OutlineNode } from "../outline-node";

const { directory } = defineProps<{ directory: Directory; }>();

const animation = computed(() => {
  return directory.isBusy() ? "pulse" : "none";
});

const name = computed(() => {
  return directory.isLoaded() ? "directory" : "directory-dashed";
});
</script>
<template>
  <OutlineNode :node="directory">
    <template #icon>
      <AppIcon
        :animation="animation"
        :name="name"
      />
    </template>
  </OutlineNode>
</template>