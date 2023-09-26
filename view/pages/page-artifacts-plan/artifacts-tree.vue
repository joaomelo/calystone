<script setup>
import { computed } from "vue";
import { treeify } from "@shared";
import { ListBase } from "@view/components";
import { useT } from "@view/i18n";

const props = defineProps({
  artifacts: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["edit", "del"]);

const t = useT();

const editAction = { name: "edit", label: t("edit") };
const delAction = { name: "del", label: t("delete") };
const map = (artifact) => ({
  id: artifact.id,
  title: artifact.name,
  actions: [editAction, delAction],
});
const tree = computed(() => treeify(props.artifacts, { map }));

const handleAction = ({ action, item }) => emit(action, item.id);
</script>
<template>
  <list-base :items="tree" @action="handleAction" />
</template>
