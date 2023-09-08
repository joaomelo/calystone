<script setup>
import { computed } from "vue";
import { HeadingText, useT } from "@lib";
import { useArtifacts } from "@body";

const props = defineProps({
  artifactId: {
    type: String,
    required: true,
  },
});

const t = useT();

const artifacts = useArtifacts();

const artifactText = computed(() => {
  const artifact = artifacts.get(props.artifactId);
  return artifact ? artifact.name : "...";
});
</script>
<template>
  <div>
    <heading-text clipped>{{ artifactText }}</heading-text>
    <div class="edit-title-crumbs">
      <router-link :to="{ name: 'artifactsPlan' }">
        {{ t("artifacts") }}
      </router-link>
    </div>
  </div>
</template>
<style scoped>
.edit-title-crumbs {
  margin-top: var(--size-10);
}
</style>
