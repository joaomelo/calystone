<script setup lang="ts">
import { DEFAULT_ACTIVITY } from "@/display/activities";
import { useI18n } from "@/display/i18n";
import { ButtonBase } from "@/display/widgets";
import { feed, loadFileSystem, openMedia, useStore } from "@/domain";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const { t } = useI18n();

async function handleOpenFileSystemAccess() {
  const root = await showDirectoryPicker();

  // in the future we can have load functions for things like dropbox or webRTC
  openMedia(store.media, () => loadFileSystem(root));

  void feed(store.nodes, store.media);
  void router.push({ name: DEFAULT_ACTIVITY });
}
</script>
<template>
  <div class="page-open">
    <h1 class="page-open-title">
      Calystone
    </h1>
    <ButtonBase
      :label="t('open-dir')"
      size="large"
      @click="handleOpenFileSystemAccess"
    />
  </div>
</template>
<style scoped>
.page-open {
  text-align: center;
}

.page-open-title {
  color: var(--p-primary-color);
  margin-block-start: var(--size-8);
  margin-block-end: var(--size-12);
  font-size: var(--font-size-8);
  font-weight: var(--font-weight-8);
}
</style>