<script setup lang="ts">
import { useI18n } from "@/display/i18n";
import { ButtonBase } from "@/lib";

const emit = defineEmits<{
  open: [handle: FileSystemDirectoryHandle],
}>();

const { t } = useI18n();


async function handleOpen() {
  const handle = await showDirectoryPicker();
  emit("open", handle);
}
</script>
<template>
  <div class="page-open">
    <h1 class="page-open-title">
      Calystone
    </h1>
    <ButtonBase
      :label="t('open-dir')"
      size="large"
      @click="handleOpen"
    />
  </div>
</template>
<style scoped>
.page-open {
  text-align: center;
}

.page-open-title {
  color: var(--p-primary-color);
  margin-block-start: var(--size-8);
  margin-block-end: var(--size-12);
  font-size: var(--font-size-8);
  font-weight: var(--font-weight-8);
}
</style>