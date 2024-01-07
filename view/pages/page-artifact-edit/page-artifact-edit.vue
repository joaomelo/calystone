<script setup>
import { FrameDashboard } from "@view/smart";
import { useI18n } from "@lib";

import FormEdit from "./form-edit.vue";

defineProps({
  artifactId: {
    type: String,
    required: true,
  },
});

const { t } = useI18n();
</script>
<template>
  <frame-dashboard :title="t('page-artifact-edit.edit')">
    <form-edit :artifact-id="artifactId" />
  </frame-dashboard>
</template>
