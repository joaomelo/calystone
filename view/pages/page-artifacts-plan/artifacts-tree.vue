<script setup>
import { ListBase } from "@lib";
import { usePilot } from "@body";
import { useTree } from "./use-tree";

const artifacts = useTree();
const pilot = usePilot();

const handleAction = ({ action, item }) => {
  switch (action) {
    case "del":
      return pilot.delArtifact(item);
    default:
      console.log({ action, item });
  }
};
</script>
<template>
  <list-base :items="artifacts" @action="handleAction" />
</template>
