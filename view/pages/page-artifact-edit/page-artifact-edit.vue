<script setup>
import { useI18n } from "@lib";
import { FrameDashboard } from "@view/smart";

import FormEdit from "./form-edit.vue";

defineProps({
  artifactId: {
    required: true,
    type: String,
  },
});

const { t } = useI18n();
</script>
<template>
  <frame-dashboard :title="t('shared-operations.edit')">
    <form-edit :artifact-id="artifactId" />
  </frame-dashboard>
</template>
