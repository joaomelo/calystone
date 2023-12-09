<script setup>
import { onMounted } from "vue";
import { useI18n } from "@lib";
import { FrameBase } from "@view";
import { useSolveCase } from "./solve-case";

const { t } = useI18n();
const { task } = useSolveCase();

onMounted(() => task.run());
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

  font-size: var(--font-size-15);
  text-align: center;
}
</style>
