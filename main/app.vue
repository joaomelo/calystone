<script setup>
import { onMounted } from "vue";
import { useDependencies } from "@lib";
import { goStart } from "@view";

const dependencies = useDependencies();
onMounted(() => goStart(dependencies));
</script>
<template>
  <router-view></router-view>
</template>
