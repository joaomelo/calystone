<script setup>
import { useT } from "../../../lib";
import { PageBase } from "../page-base";

const t = useT();
</script>
<template>
  <page-base>
    <p class="message">{{ t("loading") }}...</p>
  </page-base>
</template>
<style scoped>
.message {
  text-align: center;
}
</style>
