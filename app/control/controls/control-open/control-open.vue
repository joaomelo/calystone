<script setup lang="ts">
import { DEFAULT_ACTIVITY, PageOpen } from "@/display";
import { FileSystemSource, Store } from "@/domain";
import { useRouter } from "vue-router";

const router = useRouter();
const store = Store.use();

function handleOpen(handle: FileSystemDirectoryHandle) {
  const source = new FileSystemSource(handle);
  void store.artifacts.stream(source);
  void router.push({ name: DEFAULT_ACTIVITY });
}
</script>
<template>
  <PageOpen @open="handleOpen" />
</template>