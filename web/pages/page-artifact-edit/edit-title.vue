<script setup>
import { computed } from "vue";
import { HeadingText, useGlobalStateful } from "../../../lib";
import { routesPaths } from "../../router";

const props = defineProps({
  artifactId: {
    type: String,
    required: true,
  },
});

const programsText = useGlobalStateful((i18n) => i18n.t("plan"));

const artifactParticle = useGlobalStateful((artifacts) => {
  const artifact = artifacts.findProgramWithId(props.artifactId);
  return artifact ? artifact.name : "...";
});
const editParticle = useGlobalStateful((i18n) => i18n.t("edit"));
const editText = computed(
  () => `${editParticle.value} ${artifactParticle.value}`
);
</script>
<template>
  <heading-text clipped>
    <router-link :to="routesPaths.programs">{{ programsText }}</router-link>
    >
    {{ editText }}
  </heading-text>
</template>
