<script setup>
import { computed } from "vue";
import { ListBase, useI18n } from "@lib";
import { useDisplay } from "@view/routes";
import { useWithBody, searchArtifacts } from "@body";

const props = defineProps({
  term: {
    type: String,
    default: null,
  },
});

const { t } = useI18n();
const display = useDisplay();
const search = useWithBody(searchArtifacts);

const editAction = { value: "edit", text: t("page-search.edit") };
const actions = [editAction];

const list = computed(() => {
  const searched = search(props.term);
  return searched.map(({ id, name }) => ({
    value: id,
    text: name,
    actions,
  }));
});

const handleAction = ({ action, item: artifactId }) => {
  switch (action) {
    case editAction.value:
      return display.pageArtifactEdit(artifactId);
  }
};
</script>
<template>
  <list-base :items="list" @action="handleAction" />
</template>
