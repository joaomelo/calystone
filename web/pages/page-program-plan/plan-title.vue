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

const programText = useGlobalStateful((brother) => {
  const program = brother.findProgramWithId(props.programId);
  return program ? program.name : "...";
});
const sharingOf = useGlobalStateful((i18n) => i18n.t("sharingOf"));
const sharingText = computed(() => `${sharingOf.value} ${programText.value}`);
</script>
<template>
  <heading-text clipped>
    <router-link :to="routesPaths.programs">{{ programsText }}</router-link>
    &nbsp;>&nbsp;{{ sharingText }}
  </heading-text>
</template>
