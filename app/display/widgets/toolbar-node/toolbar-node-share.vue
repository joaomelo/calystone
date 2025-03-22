<script setup lang="ts">
import type { Node } from "@/domain";

import { ToolbarButton } from "@/utils";
defineProps<{
  node: Node;
}>();
</script>
<template>
  <ToolbarButton
    v-if="false"
    icon="bxs-share-alt"
    data-test="button-share"
  />
</template>
