<script setup lang="ts">
import { useControl } from "@control";

const control = useControl();
</script>
<template>
  <router-view v-bind="control" />
</template>
