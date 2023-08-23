<script setup>
import { computed } from "vue";
import { HeadingText, useGlobalStateful } from "../../../lib";

const props = defineProps({
  artifactId: {
    type: String,
    required: true,
  },
});

const artifact = useGlobalStateful((artifacts) =>
  artifacts.findArtifactWithId(props.artifactId)
);

const planText = useGlobalStateful((i18n) => i18n.t("plan"));
const programText = computed(() =>
  artifact.value ? artifact.value.program.name : "..."
);

const editText = useGlobalStateful((i18n) => i18n.t("edit"));
const artifactText = computed(() =>
  artifact.value ? artifact.value.name : "..."
);

const planRoute = computed(() => ({
  name: "programPlan",
  params: { programId: artifact.value?.program.id || "..." },
}));
</script>
<template>
  <heading-text clipped>
    <router-link :to="planRoute">
      {{ `${planText} ${programText}` }}
    </router-link>
    <span> > </span>
    <span>{{ `${editText} ${artifactText}` }}</span>
  </heading-text>
</template>
