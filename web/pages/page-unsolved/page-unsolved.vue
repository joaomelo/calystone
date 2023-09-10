<script setup>
import { useT } from "@lib";
import { PageBase } from "../page-base";

const t = useT();
</script>
<template>
  <page-base>
    <p class="page-unsolved">{{ t("unsolved") }}...</p>
  </page-base>
</template>
<style scoped>
.page-unsolved {
  text-align: center;
}
</style>
