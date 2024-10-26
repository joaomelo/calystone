<script setup lang="ts">
import { useI18n } from "@/display/i18n";
import { InputSelectButton } from "@/display/widgets";

const { availableLocales, locale } = useI18n();

</script>
<template> 
  <div class="locale-switch">
    <InputSelectButton
      v-model="locale"
      :options="availableLocales"
    />
  </div>
</template>
<style scoped>
.locale-switch {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>