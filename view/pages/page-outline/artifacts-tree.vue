<script setup>
import { ListBase, useDependencies } from "@lib";
import { addArtifact } from "@body";
// import { addArtifact, delArtifact } from "@body";
// import { goArtifactEdit, goOutline } from "@view";
import { useTree } from "./use-tree";

const props = defineProps({
  parentId: {
    type: String,
    default: null,
  },
});

const dependencies = useDependencies();

const handleAction = ({ action, item: id }) => {
  switch (action) {
    case "append":
      return addArtifact(dependencies, { parentId: id });
    // case "del":
    //   return delArtifact(dependencies, id);
    // case "edit":
    //   return goArtifactEdit(dependencies, id);
    // case "focus":
    //   return goOutline(dependencies, id);
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
