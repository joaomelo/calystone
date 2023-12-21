<script setup>
import { computed } from "vue";
import { useDependencies, ancestify, CrumbsBase } from "@lib";
import { listArtifacts } from "@body";
import { goOutline } from "./navigation";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const dependencies = useDependencies();
const ancestry = computed(() => {
  const list = listArtifacts(dependencies);
  const ancestry = ancestify(list, props.id);
  const last = ancestry.length - 1;
  return ancestry.map(({ id, name }, i) => ({
    value: id,
    text: name,
    inactive: i == last,
  }));
});

const handleCrumb = (value) => goOutline(dependencies, value);
</script>
<template>
  <crumbs-base :crumbs="ancestry" @crumb="handleCrumb" />
</template>
