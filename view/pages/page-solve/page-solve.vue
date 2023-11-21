<script setup>
import { onMounted } from "vue";
import { useI18n, AUTH_STATUSES } from "@lib";
import { useBody } from "@body";
import { useDisplay } from "@view/display";
import { FrameBase } from "@view/frames";

const { t } = useI18n();
const display = useDisplay();
const { gate } = useBody();

onMounted(async () => {
  await gate.solve();
  if (gate.status === AUTH_STATUSES.SIGNED_IN) {
    display.pageStart();
  } else {
    display.pageAuth();
  }
});
</script>
<template>
  <frame-base>
    <div class="page-solve">
      {{ t("page-solve.prepare") }}
    </div>
  </frame-base>
</template>
<style scoped>
.page-solve {
  flex-grow: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: var(--font-size-30);
  text-align: center;
}
</style>
