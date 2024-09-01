<script setup>
import { listArtifacts, placeArtifactAfter, placeArtifactBefore, transferArtifact } from "@body";
import { ListBase, treeify, truncate, useDependencies } from "@lib";
import { computed } from "vue";

const props = defineProps({
  parentId: {
    default: null,
    type: String,
  },
});

const dependencies = useDependencies();

const map = ({ id, notes }) => ({
  tooltip: truncate(notes, 100),
  value: id,
});
const items = computed(() => {
  const list = listArtifacts(dependencies);

  // some use cases provide the parentId as an empty string and that need to be updated to null
  const normalizedParentId = props.parentId || null;
  const isRoot = a => a.parentId === normalizedParentId;

  return treeify(list, { isRoot, map });
});

const handleDrag = ({ section, source, target }) => {
  if (target === source) return;

  if (section === "middle") {
    transferArtifact(dependencies, {
      id: source,
      parentId: target,
    });
  }

  if (section === "top") {
    placeArtifactBefore(dependencies, {
      id: source,
      siblingId: target,
    });
  }

  if (section === "bottom") {
    placeArtifactAfter(dependencies, {
      id: source,
      siblingId: target,
    });
  }
}; </script>
<template>
  <list-base
    :items="items"
    draggable
    @drag="handleDrag"
  >
    <template #item="slotProps">
      <slot
        name="item"
        v-bind="slotProps"
      />
    </template>
  </list-base>
</template>
