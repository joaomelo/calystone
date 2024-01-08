<script setup>
import { listAscendants } from "@body";
import { CrumbsBase, useDependencies } from "@lib";
import { computed } from "vue";

import { goOutline } from "./navigation";

const props = defineProps({
  id: {
    required: true,
    type: String,
  },
});

const dependencies = useDependencies();
const crumbs = computed(() => {
  const ascendants = listAscendants(dependencies, props.id);
  const last = ascendants.length - 1;
  return ascendants.map(({ id, name }, i) => ({
    inactive: i == last,
    text: name,
    value: id,
  }));
});

const handleCrumb = value => goOutline(dependencies, value);
</script>
<template>
  <crumbs-base
    :crumbs="crumbs"
    @crumb="handleCrumb"
  />
</template>
