<script setup lang="ts">
import { setRoot, useStore } from "@/data";
import { PageOpen } from "@/display";
import { DEFAULT_ACTIVITY } from "@/domain";
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