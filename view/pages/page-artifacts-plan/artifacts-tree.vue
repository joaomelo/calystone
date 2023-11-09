<script setup lang="ts">
import type { Item } from "@view/components";

import { computed } from "vue";
import { treeify, mapTree } from "@shared";
import { usePilot } from "@pilot";
import { ListBase } from "@view/components";
import { useT } from "@view/i18n";

const t = useT();

const editAction = { name: "edit", label: t("edit") };
const appendAction = { name: "append", label: t("append") };
const delAction = { name: "del", label: t("delete") };
const actions = [editAction, appendAction, delAction];

const pilot = usePilot();
const artifacts = pilot.listArtifacts();

const items: Item[] = computed(() => {
  const tree = treeify(artifacts.value);
  const items = mapTree(tree, (a) => ({
    value: a.id,
    text: a.title,
    actions,
  }));
  return items;
});

const handleAction = ({ action, item }) => emit(action, item.id);
</script>
<template>
  <list-base :items="items" @action="handleAction" />
</template>
