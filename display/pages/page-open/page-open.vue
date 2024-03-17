<script setup>
import { useDependencies, useI18n } from "@lib";
import { FrameMessage } from "@view/smart";
import { onMounted } from "vue";

const { t } = useI18n();
const { helmsman, gatekeeper } = useDependencies();

onMounted(async () => {
  await gatekeeper.open();
  helmsman.start();
});
</script>
<template>
  <frame-message>
    {{ t("shared.prepare") }}
  </frame-message>
</template>
