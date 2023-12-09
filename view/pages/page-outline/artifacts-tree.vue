<script setup>
import { ListBase } from "@lib";
import { useBody } from "@body";
import { useDisplay } from "@view/routes";
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

const handleDrag = ({ target, source, section }) => {
  if (target === source) return;

  if (section === "middle") {
    artifacts.transfer({
      id: source,
      parentId: target,
    });
  }

  if (section === "top") {
    artifacts.hoist({
      id: source,
      siblingId: target,
    });
  }

  if (section === "bottom") {
    artifacts.lower({
      id: source,
      siblingId: target,
    });
  }
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
