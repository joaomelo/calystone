<script setup>
import { inject } from "vue";
import { useStateful } from "../../../lib";
import { PageBase } from "../page-base";

const { i18n } = inject("globals");
const loadingText = useStateful(i18n, (i) => i.t("loading"));
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
