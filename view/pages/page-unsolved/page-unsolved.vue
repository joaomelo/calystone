<script setup lang="ts">
import { FrameBase } from "@view/frames";
import { useT } from "@view/i18n";

const t = useT();
</script>
<template>
  <frame-base>
    <div class="page-unsolved">
      {{ t("unsolved") }}
    </div>
  </frame-base>
</template>
<style scoped>
.page-unsolved {
  flex-grow: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: var(--font-size-40);
}
</style>
