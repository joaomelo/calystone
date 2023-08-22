<script setup>
import { computed } from "vue";
import { HeadingText, useGlobalStateful } from "../../../lib";
import { routesPaths } from "../../router";

const props = defineProps({
  programId: {
    type: String,
    required: true,
  },
});

const programsText = useGlobalStateful((i18n) => i18n.t("programs"));

const programText = useGlobalStateful((programs) => {
  const program = programs.findProgramWithId(props.programId);
  return program ? program.name : "...";
});
const planningOf = useGlobalStateful((i18n) => i18n.t("planningOf"));
const planningText = computed(() => `${planningOf.value} ${programText.value}`);
</script>
<template>
  <heading-text clipped>
    <router-link :to="routesPaths.programs">{{ programsText }}</router-link>
    >
    {{ planningText }}
  </heading-text>
</template>
