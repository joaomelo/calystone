<script setup>
// import { computed } from "vue";
// import { treeify, mapTree } from "@lib";
import { ListBase } from "@lib";
import { useCase } from "@pilot";
// import { useT } from "@view/i18n";

// const t = useT();

// const editAction = { name: "edit", label: t("edit") };
// const appendAction = { name: "append", label: t("append") };
// const delAction = { name: "del", label: t("delete") };
// const actions = [editAction, appendAction, delAction];

// const pilot = usePilot();
const { artifacts } = useCase("artifactsListCase");

// const handleAction = ({ action, item }) => emit(action, item.id);
</script>
<template>
  <list-base :items="artifacts" />
  <!-- <list-base :items="items" @action="handleAction" /> -->
</template>
