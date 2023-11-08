<script setup lang="ts">
import type { Map, Treeable } from "@shared";

import { computed } from "vue";
import { treeify } from "@shared";
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
const map = (artifact: Treeable) => ({
  id: artifact.id,
  parentId: artifact.parentId,
  value: artifact.id,
  text: artifact.title,
  actions,
});
const tree = computed(() => {
  const tree = treeify(artifacts.value);
});

const handleAction = ({ action, item }) => emit(action, item.id);
</script>
<template>
  <list-base :items="tree" @action="handleAction" />
</template>
