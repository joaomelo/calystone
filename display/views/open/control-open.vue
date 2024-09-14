<script setup lang="ts">
import { createFileSystem } from "@data";
import { useRouter } from "vue-router";

import { routeConnect } from "../connect";
import { routeOutline } from "../outline";
import PageOpen from "./page-open.vue";

const router = useRouter();

function handleOpen(handle: FileSystemDirectoryHandle) {
  const fileSystem = createFileSystem(handle);
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