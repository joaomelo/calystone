<script setup lang="ts">
import { useOpen } from "./use-open";
const { data, dispacth } = useOpen();
console.log(data, dispacth);
</script>
<template>
  <div>open</div>
</template>
