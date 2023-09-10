<script setup>
import { PageBase } from "../page-base";
import { useT } from "@lib";
const t = useT();
</script>

<template>
  <page-base>
    <p class="page-unloaded">{{ t("unloaded") }}...</p>
  </page-base>
</template>
<style scoped>
.page-unloaded {
  text-align: center;
}
</style>
