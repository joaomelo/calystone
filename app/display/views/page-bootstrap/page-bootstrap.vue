<script setup lang="ts">
import type { Source } from "@/infra";

import { activities, defaultActivity } from "@/display/activities";
import { useI18n } from "@/display/i18n";
import { Store } from "@/display/store";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const { source } = defineProps<{
  source: Source
}>();

const { t } = useI18n();
const { nodesService } = Store.use();
const router = useRouter();

onMounted(async () => {

  try {
    await nodesService.bootstrap(source);
  } catch {
    void router.push({ name: activities.open });
    return;
  }

  void router.push({ name: defaultActivity });
});

</script>
<template>
  <div>{{ t("loading") }}</div>
</template>
