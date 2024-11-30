<script setup lang="ts">
import { DEFAULT_ACTIVITY } from "@/display/activities";
import { useI18n } from "@/display/i18n";
import { Store } from "@/display/store";
import { ButtonBase, TextMessage, useLogToast } from "@/display/widgets";
import { checkFsaSupport, FsaNodesConnection } from "@/domain";
import { Severity } from "@/utils";
import { useRouter } from "vue-router";

const router = useRouter();
const { nodes } = Store.use();
const { t } = useI18n();
const toast = useLogToast();

const isSupported = checkFsaSupport();

async function handleOpenFsa() {
  try {
    const root = await showDirectoryPicker();
    const connection = new FsaNodesConnection(root);
    void nodes.connect(connection);
    void router.push({ name: DEFAULT_ACTIVITY });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    toast(Severity.Error, t("errors.unable-open-directory"), detail);
  }
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