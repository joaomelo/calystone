<script setup>
import { toRef } from "vue";
import { ListBase, useDependencies } from "@lib";
import {
  addArtifact,
  delArtifact,
  hoistArtifact,
  lowerArtifact,
  transferArtifact,
} from "@body";
import { goArtifactEdit, goOutline } from "@view/pages";
import { useActions } from "./use-actions";
import { useTree } from "./use-tree";

const props = defineProps({
  parentId: {
    type: String,
    default: null,
  },
});

const dependencies = useDependencies();

const { actions, editAction, appendAction, focusAction, delAction } =
  useActions();

const handleAction = ({ action, item: id }) => {
  switch (action) {
    case appendAction.value:
      return addArtifact(dependencies, { parentId: id });
    case delAction.value:
      return delArtifact(dependencies, id);
    case editAction.value:
      return goArtifactEdit(dependencies, id);
    case focusAction.value:
      return goOutline(dependencies, id);
  }
};

const handleDrag = ({ target, source, section }) => {
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
};

const artifactsTree = useTree(toRef(props, "parentId"), actions);
</script>
<template>
  <list-base
    :items="artifactsTree"
    draggable
    @action="handleAction"
    @drag="handleDrag"
  />
</template>
