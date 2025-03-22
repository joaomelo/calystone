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
    icon="bxs-trash"
    data-test="button-remove"
  />
</template>
