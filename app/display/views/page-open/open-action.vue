<script setup lang="ts">
import type { Source } from "@/infra";

import { Store } from "@/display/store";
import { ButtonBase } from "@/display/widgets";
import { useErrorToast } from "@/display/widgets";
import { useI18n } from "@/utils";
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
const { service } = Store.use();

async function handleClick() {
  try {
    await service.accessRequest.request(source);
    void router.push({ name: "bootstrap", params: { source } });
  } catch (error) {
    toast(error);
  }
}

</script>
<template>
  <ButtonBase
    v-if="service.accessRequest.support(source)"
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
