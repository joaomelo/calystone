<script setup lang="ts">
import { defaultActivity } from "@/display/activities";
import { useI18n } from "@/display/i18n";
import { State } from "@/display/state";
import { ButtonBase, TextMessage, useExceptionToast } from "@/display/widgets";
import { Exception, Nodes } from "@/domain";
import { checkFsaSupport, FsaNodesRepository } from "@/repositories";
import { useRouter } from "vue-router";

const router = useRouter();
const state = State.use();
const { t } = useI18n();
const toast = useExceptionToast();

const isSupported = checkFsaSupport();

async function handleOpenFsa() {
  try {
    const root = await showDirectoryPicker();
    const repository = new FsaNodesRepository(root);
    const ignore = state.ignore.value;
    const nodes = new Nodes({ ignore, repository });
    void nodes.load();

    state.updateNodes(nodes);

    void router.push({ name: defaultActivity });
  } catch (error) {
    const exception = new Exception("UNABLE_OPEN_DIRECTORY", error);
    toast(exception);
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