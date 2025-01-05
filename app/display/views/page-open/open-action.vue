<script setup lang="ts">
import type { Service } from "@/infra";

import { defaultActivity } from "@/display/activities";
import { useI18n } from "@/display/i18n";
import { Store } from "@/display/store";
import { ButtonBase } from "@/display/widgets";
import { useExceptionToast } from "@/display/widgets";
import { Exception } from "@/utils";
import { useRouter } from "vue-router";

const { service } = defineProps<{
  dataTest: string;
  icon: string;
  label: string;
  service: Service;
}>();

const { t } = useI18n();
const router = useRouter();
const toast = useExceptionToast();
const { nodesService } = Store.use();

async function handleClick() {
  try {
    await nodesService.bootstrap(service);
    void router.push({ name: defaultActivity });
  } catch (error) {
    const exception = new Exception("UNABLE_OPEN", error);
    toast(exception);
  }
}

</script>
<template>
  <ButtonBase
    v-if="nodesService.active(service)"
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
