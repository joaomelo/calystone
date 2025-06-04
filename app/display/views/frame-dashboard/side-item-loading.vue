<script setup lang="ts">
import { Store } from "@/display/store";
import { SideItem, useI18n } from "@/utils";
import { computed, ref } from "vue";

const { t } = useI18n();
const { services } = Store.use();

const loading = ref(false);
services.preloadNodes.subscribe(({ status }) => {
  loading.value = status === "loading";
});

const isAvailable = computed(() => services.preloadNodes.available().isOk());
const icon = computed(() => loading.value ? "bx bx-md bx-loader bx-spin" : "bx bx-md bx-loader");
const title = computed(() => loading.value ? t("load-nodes.loading") : t("load-nodes.idle"));
const dataTest = computed(() => loading.value ? "load-nodes-loading" : "load-nodes-idle");

function handleLoading() {
  if (loading.value) {
    services.preloadNodes.pause();
  } else {
    services.preloadNodes.start();
  }
}
</script>
<template>
  <SideItem
    v-if="isAvailable"
    id="loading"
    :icon="icon"
    :title="title"
    :data-test="dataTest"
    class="side-item-loading"
    @click="handleLoading"
  />
</template>

<style scoped>
.side-item-loading :deep(.side-item-icon) {
  animation-duration: 7s;
}
</style>
