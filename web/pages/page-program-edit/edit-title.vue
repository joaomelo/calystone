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

const programParticle = useGlobalStateful((strategist) => {
  const program = strategist.findProgramWithId(props.programId);
  return program ? program.name : "...";
});
const editParticle = useGlobalStateful((i18n) => i18n.t("edit"));
const editText = computed(
  () => `${editParticle.value} ${programParticle.value}`
);
</script>
<template>
  <heading-text clipped>
    <router-link :to="routesPaths.programs">{{ programsText }}</router-link>
    &nbsp;>&nbsp;
    {{ editText }}
  </heading-text>
</template>
