<script setup lang="ts">
import type { SourceProvider } from "@/infra";

import { Store } from "@/display/store";
import { Frameplain } from "@/display/views/frame-plain";
import { useI18n } from "@/utils";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const { provider } = defineProps<{ provider: SourceProvider }>();

const { t } = useI18n();
const { services } = Store.use();
const router = useRouter();

onMounted(async () => {
  try {
    await services.connectSource.connect(provider);
    void router.push({ name: "nodes" });
  } catch {
    void router.push({ name: "open" });
  }
});

</script>
<template>
  <Frameplain>
    <div>{{ t("loading") }}</div>
  </Frameplain>
</template>
