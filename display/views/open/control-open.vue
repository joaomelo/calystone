<script setup lang="ts">
import { setRoot, useStore } from "@data";
import { useRouter } from "vue-router";

import { routeOutline } from "../outline";
import PageOpen from "./page-open.vue";

const router = useRouter();
const store = useStore();

function handleOpen(handle: FileSystemDirectoryHandle) {
  setRoot(handle, store);
  void router.push({ name: routeOutline.name });
}
</script>
<template>
  <PageOpen
    @open="handleOpen"
  />
</template>