<script setup lang="ts">
import { useI18n } from "@display/i18n";
import { FrameFocus } from "@display/widgets";
import { ButtonBase } from "@lib";

const emit = defineEmits<{
  connect: [],
  open: [handle: FileSystemDirectoryHandle],
}>();

const { t } = useI18n();

async function handleOpen() {
  const handle = await showDirectoryPicker();
  emit("open", handle);
}

function handleConnect() {
  emit("connect");
}
</script>
<template>
  <FrameFocus>
    <ButtonBase
      :label="t('open-dir')"
      @click="handleOpen"
    />
    <p>or</p>
    <ButtonBase
      :label="t('connect')"
      @click="handleConnect"
    />
  </FrameFocus>
</template>
