<script setup lang="ts">
import { FrameFocus } from "@display/widgets";
import { ButtonBase } from "@lib";

// import { useControl } from "./use-control";

// const { data, dispacth } = useControl();
// console.log(data, dispacth);

function handleOpen() {
  console.log("open");
}

function handleConnect() {
  console.log("connect");
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
