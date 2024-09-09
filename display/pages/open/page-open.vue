<script setup lang="ts">
import { useI18n } from "@display/i18n";
import { FrameFocus } from "@display/widgets";
import { ButtonBase } from "@lib";

import { useControl } from "./use-control";

const { t } = useI18n();

const control = useControl();

async function handleOpen() {
  const handle = await showDirectoryPicker();
  control.dispatch.open(handle);
}

function handleConnect() {
  control.dispatch.connect();
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
