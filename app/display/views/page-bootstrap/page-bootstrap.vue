<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import type { SourceProvider } from "@/infra";

import { useI18n } from "@/display/affordances/i18n";
import { Store } from "@/display/store";
import { Frameplain } from "@/display/views/frame-plain";

const { provider } = defineProps<{ provider: SourceProvider }>();

const { t } = useI18n();
const { services } = Store.use();
const router = useRouter();

onMounted(async () => {
  try {
    await services.connectSource.connect(provider);
    void router.push({ name: "folders" });
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
