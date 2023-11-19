<script setup>
import { useRouter } from "vue-router";
import { ListBase } from "@lib";
import { useBody } from "@body";
import { useTree } from "./use-tree";

const router = useRouter();
const artifactsTree = useTree();
const { artifacts } = useBody();

const handleAction = ({ action, item: artifactId }) => {
  switch (action) {
    case "del":
      return artifacts.del(artifactId);
    case "edit":
      return router.push({
        name: "page-artifacts-edit",
        params: { artifactId },
      });
  }
};
</script>
<template>
  <list-base :items="artifactsTree" @action="handleAction" />
</template>
