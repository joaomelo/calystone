<script setup lang="ts">
import type { Node } from "@/domain";

import { ToolbarBase } from "@/utils";

import ToolbarNodeRemove from "./toolbar-node-remove.vue";
import ToolbarNodeRename from "./toolbar-node-rename.vue";
import ToolbarNodeShare from "./toolbar-node-share.vue";

defineProps<{
  node?: Node;
}>();
</script>
<template>
  <ToolbarBase>
    <template #start>
      <template v-if="node">
        <ToolbarNodeRename :node="node" />
        <ToolbarNodeShare :node="node" />
        <ToolbarNodeRemove :node="node" />
      </template>
      <slot name="start" />
    </template>
    <template #end>
      <slot name="end" />
    </template>
  </ToolbarBase>
</template>