<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n, AUTH_STATUSES } from "@lib";
import { usePilot } from "@body";
import { FrameBase } from "@view/frames";

const { t } = useI18n();
const router = useRouter();
const pilot = usePilot();

onMounted(async () => {
  await pilot.solve();
  if (pilot.auth.status === AUTH_STATUSES.SIGNED_IN) {
    router.push({ name: "page-artifacts-plan" });
  } else {
    router.push({ name: "page-auth" });
  }
});
</script>
<template>
  <frame-base>
    <div class="page-unsolved">
      {{ t("page-unsolved.unsolved") }}
    </div>
  </frame-base>
</template>
<style scoped>
.page-unsolved {
  flex-grow: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: var(--font-size-30);
  text-align: center;
}
</style>
