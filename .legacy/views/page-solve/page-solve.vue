<script setup>
import { AUTH_STATUSES, useDependencies, useI18n } from "@lib";
import { FrameMessage } from "@view/smart";
import { onMounted } from "vue";

const { t } = useI18n();
const { gatekeeper, helmsman } = useDependencies();

onMounted(async () => {
  const status = await gatekeeper.solveStatus();
  if (status === AUTH_STATUSES.SIGNED_IN) {
    helmsman.open();
  }
  else {
    helmsman.signIn();
  }
});
</script>
<template>
  <frame-message>
    {{ t("shared.wait") }}
  </frame-message>
</template>
