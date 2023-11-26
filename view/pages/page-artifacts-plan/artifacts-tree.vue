<script setup>
import { ListBase } from "@lib";
import { useBody } from "@body";
import { useDisplay } from "@view/display";
import { useTree } from "./use-tree";

const display = useDisplay();
const artifactsTree = useTree();
const { artifacts } = useBody();

const handleAction = ({ action, item: artifactId }) => {
  switch (action) {
    case "del":
      return artifacts.del(artifactId);
    case "append":
      return artifacts.append(artifactId);
    case "edit":
      return display.pageArtifactEdit(artifactId);
  }
};

const handleDrag = ({ target, source }) => {
  artifacts.transfer({
    itemId: source,
    parentId: target,
  });
};
</script>
<template>
  <list-base
    :items="artifactsTree"
    draggable
    @action="handleAction"
    @drag="handleDrag"
  />
</template>
