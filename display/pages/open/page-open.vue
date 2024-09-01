<script setup lang="ts">
import { FrameFocus } from "@display/widgets";

import { useOpen } from "./use-open";
const { data, dispacth } = useOpen();
console.log(data, dispacth);
</script>
<template>
  <FrameFocus>
    open
  </FrameFocus>
</template>
