<script setup>
import { useGlobalStateful } from "../../../lib";
import { PageBase } from "../page-base";

const loadingText = useGlobalStateful((i18n) => i18n.t("loading"));
</script>
<template>
  <page-base>
    <p class="message">{{ loadingText }}...</p>
  </page-base>
</template>
<style scoped>
.message {
  text-align: center;
}
</style>
