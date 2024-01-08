<script setup>
import { hoistArtifact, listArtifacts, lowerArtifact, transferArtifact } from "@body";
import { ListBase, sort, treeify, truncate, useDependencies } from "@lib";
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
  const sorted = sort(list, "order");

  // some use cases provide the parentId as an empty string and that need to be updated to null
  const normalizedParentId = props.parentId || null;
  const isRoot = a => a.parentId === normalizedParentId;

  return treeify(sorted, { isRoot, map });
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
    hoistArtifact(dependencies, {
      id: source,
      siblingId: target,
    });
  }

  if (section === "bottom") {
    lowerArtifact(dependencies, {
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
