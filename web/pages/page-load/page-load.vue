<script setup>
import { useT } from "@web/i18n";
import { ButtonBase } from "@web/components";
import { PageBase } from "../page-base";

const t = useT();
const handleClick = () => {
  console.log("open");
};
</script>
<template>
  <page-base>
    <div class="page-load">
      <button-base @click="handleClick">{{ t("load") }}</button-base>
    </div>
  </page-base>
</template>
<style scoped>
.page-load {
  flex-grow: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: var(--font-size-40);
}
</style>
