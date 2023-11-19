<script setup>
import { ListBase } from "@lib";
import { useTree } from "./use-tree";

const artifacts = useTree();

// const handleAction = ({ action, item }) => emit(action, item.id);
</script>
<template>
  <list-base :items="artifacts" />
  <!-- <list-base :items="items" @action="handleAction" /> -->
</template>
