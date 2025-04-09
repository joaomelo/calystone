<script setup lang="ts">
import type { Source } from "@/infra";

import { Store } from "@/display/store";
import { ButtonBase, useDispatch, useI18n } from "@/utils";
import { useRouter } from "vue-router";

const { source } = defineProps<{
  dataTest: string;
  icon: string;
  label: string;
  source: Source;
}>();

const { t } = useI18n();
const router = useRouter();
const { dispatchOrToast, loading } = useDispatch();
const { services } = Store.use();

async function handleClick() {
  await dispatchOrToast(async () => {
    await services.accessRequest.request(source);
    void router.push({ name: "bootstrap", params: { source } });
  });
}

</script>
<template>
  <ButtonBase
    v-if="services.availSource.avail(source)"
    :label="t(label)"
    size="large"
    :data-test="dataTest"
    :icon="icon"
    class="open-base"
    :loading="loading"
    @click="handleClick"
  >
    <template #icon>
      <slot name="icon" />
    </template>
  </ButtonBase>
</template>
