<script setup lang="ts">
import type { FileText } from "@/domain";

// import { useI18n } from "@/display/i18n";

// import { useWithArtifacts } from "../use-with-artifacts";

const { artifact } = defineProps<{
  artifact: FileText;
}>();

// const { t } = useI18n();
</script>
<template>
  <div>
    <p>{{ artifact.mime }}</p>
  </div>
</template>