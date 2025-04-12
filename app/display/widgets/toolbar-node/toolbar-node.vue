<script setup lang="ts">
import type { Node } from "@/domain";

import { Directory } from "@/domain";
import { ToolbarBase } from "@/utils";

import ToolbarButtonCreateArtifact from "./toolbar-button-create-artifact.vue";
import ToolbarButtonCreateDirectory from "./toolbar-button-create-directory.vue";
import ToolbarButtonExport from "./toolbar-button-export.vue";
import ToolbarButtonOpenDirectory from "./toolbar-button-open-directory.vue";
import ToolbarButtonRemove from "./toolbar-button-remove.vue";
import ToolbarButtonRename from "./toolbar-button-rename.vue";
import ToolbarButtonShare from "./toolbar-button-share.vue";

defineProps<{
  node?: Node;
}>();
defineEmits<{
  removed: []
}>();
</script>
<template>
  <ToolbarBase>
    <template #start>
      <template v-if="node">
        <ToolbarButtonOpenDirectory
          v-if="(node instanceof Directory)"
          :node="node"
        />
        <ToolbarButtonCreateDirectory
          v-if="(node instanceof Directory)"
          :parent="node"
        />
        <ToolbarButtonCreateArtifact
          v-if="(node instanceof Directory)"
          :parent="node"
        />
        <ToolbarButtonRename
          :node="node"
        />
        <ToolbarButtonExport
          :node="node"
        />
        <ToolbarButtonShare
          :node="node"
        />
        <ToolbarButtonRemove
          :node="node"
          @removed="$emit('removed')"
        />
      </template>
      <slot name="start" />
    </template>
    <template #end>
      <slot name="end" />
    </template>
  </ToolbarBase>
</template>