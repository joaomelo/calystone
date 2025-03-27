<script setup lang="ts">
import type { Source } from "@/infra";

import { Store } from "@/display/store";
import { Frameplain } from "@/display/widgets";
import { useI18n } from "@/utils";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const { source } = defineProps<{
  source: Source
}>();

const { t } = useI18n();
const { services } = Store.use();
const router = useRouter();

onMounted(async () => {
  try {
    await services.connection.connect(source);
    void router.push({ name: "outline" });
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
