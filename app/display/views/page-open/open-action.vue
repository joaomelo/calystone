<script setup lang="ts">
import type { Source } from "@/infra";

import { activities } from "@/display/activities";
import { useI18n } from "@/display/i18n";
import { Store } from "@/display/store";
import { ButtonBase } from "@/display/widgets";
import { useErrorToast } from "@/display/widgets";
import { useRouter } from "vue-router";

const { source } = defineProps<{
  dataTest: string;
  icon: string;
  label: string;
  source: Source;
}>();

const { t } = useI18n();
const router = useRouter();
const toast = useErrorToast();
const { nodesService } = Store.use();

async function handleClick() {
  try {
    await nodesService.request(source);
    void router.push({ name: activities.bootstrap, params: { source } });
  } catch (error) {
    toast(error);
  }
}

</script>
<template>
  <ButtonBase
    v-if="nodesService.supports(source)"
    :label="t(label)"
    size="large"
    :data-test="dataTest"
    :icon="icon"
    class="open-base"
    @click="handleClick"
  >
    <template #icon>
      <slot name="icon" />
    </template>
  </ButtonBase>
</template>
