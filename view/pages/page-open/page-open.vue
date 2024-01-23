<script setup>
// import { useI18n } from "@lib";
// import { FrameBase } from "@view";
// import { onMounted } from "vue";

// import { useSolve } from "./use-solve";

// const { t } = useI18n();
// const { task } = useSolve();

// onMounted(() => task.run());
</script>
<template>
  <!-- <frame-base> -->
  <div class="page-open">
    open
    <!-- {{ t("page-solve.prepare") }} -->
  </div>
  <!-- </frame-base> -->
</template>
<style scoped>
.page-open {
  flex-grow: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: var(--font-size-15);
  text-align: center;
}
</style>
