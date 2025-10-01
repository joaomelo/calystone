<script setup lang="ts">
import type { SourceProvider } from "@/infra";

import { Store } from "@/display/store";
import {
  ButtonBase,
  useDispatch,
  useI18n
} from "@/utils";
import { computed } from "vue";
import { useRouter } from "vue-router";

const { provider } = defineProps<{
  dataTest: string;
  label: string;
  provider: SourceProvider;
}>();

const { t } = useI18n();
const {
  dispatchOrToast,
  loading
} = useDispatch();
const { services } = Store.use();
const router = useRouter();

const show = computed(() => services.availSource.avail(provider).isOk());

async function handleClick() {
  await dispatchOrToast(async () => {
    await services.connectSource.connect(provider);
    void router.push({ name: "folders" });
  });
}

</script>
<template>
  <ButtonBase
    v-if="show"
    class="open-base"
    :data-test="dataTest"
    :label="t(label)"
    :loading="loading"
    size="large"
    @click="handleClick"
  >
    <template #icon>
      <slot name="icon" />
    </template>
  </ButtonBase>
</template>
