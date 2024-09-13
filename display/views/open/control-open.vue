<script setup lang="ts">
import { useRouter } from "vue-router";

import { routeConnect } from "../connect";
import { routeOutline } from "../outline";
import PageOpen from "./page-open.vue";

const router = useRouter();

function handleOpen(handle: FileSystemDirectoryHandle) {
  console.log(handle);
  void router.push({ name: routeOutline.name });
}

function handleConnect() {
  void router.push({ name: routeConnect.name });
}
</script>
<template>
  <PageOpen
    @open="handleOpen"
    @connect="handleConnect"
  />
</template>