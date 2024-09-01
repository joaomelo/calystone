<script setup lang="ts">
import { FrameFocus } from "@display/widgets";
import { ButtonBase } from "@lib";

import { useControl } from "./use-control";

const control = useControl();

async function handleOpen() {
  const handle = await showDirectoryPicker();
  control.dispatch.open({ handle });
}

function handleConnect() {
  control.dispatch.connect();
}
</script>
<template>
  <FrameFocus>
    <ButtonBase
      label="open dir"
      @click="handleOpen"
    />
    <p>or</p>
    <ButtonBase
      label="connect"
      @click="handleConnect"
    />
  </FrameFocus>
</template>
