<script setup lang="ts">
import { useI18n } from "@/display/i18n";
const { t } = useI18n();
</script>
<template>
  <div class="editor-empty">
    {{ t('select') }}
  </div>
</template>
<style scoped>
.editor-empty {
  height: 100%;
  display: grid;
  place-items: center;
  text-align: center;
}
</style>