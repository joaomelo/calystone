<script setup>
import { toRef } from "vue";
import { ListBase, useDependencies } from "@lib";
import { goArtifactEdit, goOutline } from "@view/pages";
import { useActions } from "./use-actions";
import { useSearched } from "./use-searched";

const props = defineProps({
  term: {
    type: String,
    default: null,
  },
});

const dependencies = useDependencies();

const { actions, editAction, focusAction } = useActions();
const list = useSearched(actions, toRef(props, "term"));

const handleAction = ({ action, item: artifactId }) => {
  switch (action) {
    case editAction.value:
      return goArtifactEdit(dependencies, artifactId);
    case focusAction.value:
      return goOutline(dependencies, artifactId);
  }
};
</script>
<template>
  <list-base :items="list" @action="handleAction" />
</template>
