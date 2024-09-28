<script setup lang="ts">
import { setRoot, useStore } from "@data";
import { PageOpen } from "@display";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

function handleOpen(handle: FileSystemDirectoryHandle) {
  setRoot(handle, store);
  void router.push({ name: "outline" });
}
</script>
<template>
  <PageOpen
    @open="handleOpen"
  />
</template>