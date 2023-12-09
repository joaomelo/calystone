<script setup>
import { ListBase, useDependencies } from "@lib";
import { addArtifact, delArtifact } from "@body";
import { useTree } from "./use-tree";

const props = defineProps({
  parentId: {
    type: String,
    default: null,
  },
});

const dependencies = useDependencies();

const handleAction = ({ action, item: artifactId }) => {
  switch (action) {
    case "del":
      return delArtifact(dependencies, artifactId);
    case "append":
      return addArtifact(dependencies, { parentId: artifactId });
    // case "edit":
    //   return display.pageArtifactEdit(artifactId);
  }
};

const handleDrag = ({ target, source, section }) => {
  console.log({ target, source, section });
  if (target === source) return;

  // if (section === "middle") {
  //   artifacts.transfer({
  //     id: source,
  //     parentId: target,
  //   });
  // }

  // if (section === "top") {
  //   artifacts.hoist({
  //     id: source,
  //     siblingId: target,
  //   });
  // }

  // if (section === "bottom") {
  //   artifacts.lower({
  //     id: source,
  //     siblingId: target,
  //   });
  // }
};

const artifactsTree = useTree(props.parentId);
</script>
<template>
  <list-base
    :items="artifactsTree"
    draggable
    @action="handleAction"
    @drag="handleDrag"
  />
</template>
