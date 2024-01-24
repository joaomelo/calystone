<script setup>
import { AUTH_STATUSES, useDependencies, useI18n } from "@lib";
import { FrameMessage } from "@view/smart";
import { onMounted } from "vue";

const { t } = useI18n();
const { display, gatekeeper } = useDependencies();

onMounted(async () => {
  const status = await gatekeeper.solveStatus();
  if (status === AUTH_STATUSES.SIGNED_IN) {
    display.open();
  }
  else {
    display.signUp();
  }
});
</script>
<template>
  <frame-message>
    {{ t("page-solve.wait") }}
  </frame-message>
</template>
