<script setup lang="ts">
import type { Source } from "@/infra";

import { Store } from "@/display/store";
import { ButtonBase } from "@/display/widgets";
import { useErrors, useI18n } from "@/utils";
import { useRouter } from "vue-router";

const { source } = defineProps<{
  dataTest: string;
  icon: string;
  label: string;
  source: Source;
}>();

const { t } = useI18n();
const router = useRouter();
const { dispatchOrToast } = useErrors();
const { service } = Store.use();

async function handleClick() {
  await dispatchOrToast(async () => {
    await service.accessRequest.request(source);
    void router.push({ name: "bootstrap", params: { source } });
  });
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
