<script setup lang="ts">
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import Toolbar from "primevue/toolbar";

import ToolbarButton from "./toolbar-button.vue";

const { node } = defineProps<{
  node: Node;
}>();
defineEmits<{
  close: []
  rename: [node: Node]
}>();

const { service } = Store.use();
</script>
<template>
  <Toolbar>
    <template #start>
      <ToolbarButton
        v-if="service.renamer.support(node)"
        icon="bxs-rename"
        @click="$emit('rename', node)"
      />
      <slot />
    </template>
    <template #end>
      <ToolbarButton
        icon="bx-x"
        @click="$emit('close')"
      />
    </template>
  </Toolbar>
</template>