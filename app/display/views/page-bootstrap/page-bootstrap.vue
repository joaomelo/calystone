<script setup lang="ts">
import type { Source } from "@/infra";

import { useI18n } from "@/display/i18n";

const { t } = useI18n();

defineProps<{
  source: {
    required: true
    type: Source,
  }
}>();

</script>
<template>
  <div>
    {{ t("loading") }}...
    {{ source }}
  </div>
</template>
