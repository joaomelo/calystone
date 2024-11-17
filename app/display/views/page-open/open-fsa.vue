<script setup lang="ts">
import { DEFAULT_ACTIVITY } from "@/display/activities";
import { useI18n } from "@/display/i18n";
import { Store } from "@/display/store";
import { ButtonBase, TextMessage } from "@/display/widgets";
import { checkFsaSupport, FsaNodesConnection } from "@/domain";
import { useRouter } from "vue-router";

const router = useRouter();
const { nodes } = Store.use();
const { t } = useI18n();

const isSupported = checkFsaSupport();

async function handleOpenFsa() {
  const root = await showDirectoryPicker();
  const connection = new FsaNodesConnection(root);
  void nodes.connect(connection);
  void router.push({ name: DEFAULT_ACTIVITY });
}
</script>
<template>
  <div class="open-fsa">
    <ButtonBase
      :label="t('open-files')"
      size="large"
      :disabled="!isSupported"
      @click="handleOpenFsa"
    />
    <TextMessage
      v-if="!isSupported"
      severity="warn"
    >
      {{ t('fsa-not-supported') }}
    </TextMessage>
  </div>
</template>
<style scoped>
.open-fsa {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--size-2);
  max-width: var(--size-14);
}
</style>