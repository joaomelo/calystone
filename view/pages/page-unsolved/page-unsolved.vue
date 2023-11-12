<script setup>
import { useI18n } from "@lib";
import { FrameBase } from "@view/frames";

const { t } = useI18n();
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
