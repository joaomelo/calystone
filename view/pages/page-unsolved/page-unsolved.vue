<script setup>
import { onMounted } from "vue";
import { useI18n } from "@lib";
import { usePilot } from "@pilot";
import { FrameBase } from "@view/frames";

const { t } = useI18n();
const pilot = usePilot();

onMounted(() => {
  pilot.start();
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
