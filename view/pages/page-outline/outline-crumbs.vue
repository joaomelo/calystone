<script setup>
import { computed } from "vue";
import { useDependencies, CrumbsBase } from "@lib";
import { listAscendants } from "@body";
import { goOutline } from "./navigation";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const dependencies = useDependencies();
const crumbs = computed(() => {
  const ascendants = listAscendants(dependencies, props.id);
  const last = ascendants.length - 1;
  return ascendants.map(({ id, name }, i) => ({
    value: id,
    text: name,
    inactive: i == last,
  }));
});

const handleCrumb = (value) => goOutline(dependencies, value);
</script>
<template>
  <crumbs-base :crumbs="crumbs" @crumb="handleCrumb" />
</template>
