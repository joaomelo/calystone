<script setup lang="ts">
import { FileSystem, useStore } from "@data";
import { useRouter } from "vue-router";

import { routeConnect } from "../connect";
import { routeOutline } from "../outline";
import PageOpen from "./page-open.vue";

const router = useRouter();
const store = useStore();

function handleOpen(handle: FileSystemDirectoryHandle) {
  const fileSystem = new FileSystem(handle);
  store.defineSource(fileSystem);

  void router.push({ name: routeOutline.name });
}

function handleGoConnect() {
  void router.push({ name: routeConnect.name });
}
</script>
<template>
  <PageOpen
    @open="handleOpen"
    @go-connect="handleGoConnect"
  />
</template>