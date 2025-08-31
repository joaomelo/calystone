<script setup lang="ts">

import type { Node } from "@/domain";
import type { OutlineGridKeys } from "@/utils";

import { Store } from "@/display/store";
import { OutlineNodes } from "@/display/views/outline-nodes";
import {
  OutlineBinary,
  OutlineDirectory,
  OutlineText,
  OutlineTodo
} from "@/display/views/outlines-node";
import {
  Directory,
  TextArtifact,
  TodoArtifact
} from "@/domain";
import { useDispatch } from "@/utils";

import { useItems } from "./use-items";

const { dispatchOrToast } = useDispatch();
const { services } = Store.use();

const selectedKeys = defineModel<OutlineGridKeys>("selectedKeys", { default: () => ({}) });
const expandedKeys = defineModel<OutlineGridKeys>("expandedKeys", { default: () => ({}) });

const items = useItems(expandedKeys);

async function handleExpanded(node: Node) {
  if (node instanceof Directory) {
    await dispatchOrToast(() => services.openDirectory.open(node));
  }
}
</script>
<template>
  <OutlineNodes
    v-model:expanded-keys="expandedKeys"
    v-model:selected-keys="selectedKeys"
    data-test="outline-folders"
    :items="items"
    display-mode="tree"
    @expanded="handleExpanded"
  >
    <template #default="{ node }">
      <OutlineDirectory
        v-if="(node instanceof Directory)"
        :directory="node"
      />
      <OutlineText
        v-else-if="(node instanceof TextArtifact)"
        :text="node"
      />
      <OutlineTodo
        v-else-if="(node instanceof TodoArtifact)"
        :todo="node"
      />
      <OutlineBinary
        v-else
        :binary="node"
      />
    </template>
  </OutlineNodes>
</template>
