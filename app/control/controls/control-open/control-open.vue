<script setup lang="ts">
import { DEFAULT_ACTIVITY, PageOpen } from "@/display";
import { setRoot, useStore } from "@/domain";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

function handleOpen(handle: FileSystemDirectoryHandle) {
  void setRoot(handle, store);
  void router.push({ name: DEFAULT_ACTIVITY });
}
</script>
<template>
  <PageOpen @open="handleOpen" />
</template>