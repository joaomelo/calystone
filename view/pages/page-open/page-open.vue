<script setup>
import { useDependencies, useI18n } from "@lib";
import { FrameMessage } from "@view/smart";
import { onMounted } from "vue";

const { t } = useI18n();
const { display, gatekeeper } = useDependencies();

onMounted(async () => {
  await gatekeeper.open();
  display.opened();
});
</script>
<template>
  <frame-message>
    {{ t("page-open.prepare") }}
  </frame-message>
</template>
