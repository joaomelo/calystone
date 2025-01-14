<script setup lang="ts">
import type { Accesses } from "@/infra";

import { defaultActivity } from "@/display/activities";
import { useI18n } from "@/display/i18n";
import { Store } from "@/display/store";
import { ButtonBase } from "@/display/widgets";
import { useErrorToast } from "@/display/widgets";
import { useRouter } from "vue-router";

const { service } = defineProps<{
  dataTest: string;
  icon: string;
  label: string;
  service: Accesses;
}>();

const { t } = useI18n();
const router = useRouter();
const toast = useErrorToast();
const { nodesService } = Store.use();

async function handleClick() {
  try {
    await nodesService.bootstrap(service);
    void router.push({ name: defaultActivity });
  } catch (error) {
    toast(error);
  }
}

</script>
<template>
  <ButtonBase
    v-if="nodesService.supports(service)"
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
