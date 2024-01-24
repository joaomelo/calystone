<script setup>
import { useI18n } from "@lib";
// import { FrameBase } from "@view";
import { onMounted } from "vue";

const { t } = useI18n();

onMounted(async () => {
  // se nao logado v á para sign up
  // se logado, abra os dados e depois de abrir os dados va para start
  console.log("mounted");
  //   await ignite(dependencies);
  //   await goStart(dependencies);
});
</script>
<template>
  <!-- <frame-base> -->
  <div class="page-open">
    {{ t("page-open.prepare") }}
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
