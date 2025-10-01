<script setup lang="ts">
import type {
  Progress,
  TodoArtifact
} from "@/domain";

import { Store } from "@/display/store";
import { Progressor } from "@/domain";
import {
  AppIcon,
  ButtonBase,
  useI18n
} from "@/utils";
import { computed } from "vue";

const { artifact } = defineProps<{ artifact: TodoArtifact; }>();

const { services } = Store.use();
const { t } = useI18n();

interface Option {
  icon: string
  label: string
  progress: Progress
}

const options: Option[] = [
  {
    icon: "square",
    label: t("editor-todo.progress.open"),
    progress: "open"
  },
  {
    icon: "square-square",
    label: t("editor-todo.progress.doing"),
    progress: "doing"
  },
  {
    icon: "square-check",
    label: t("editor-todo.progress.done"),
    progress: "done"
  },
  {
    icon: "square-x",
    label: t("editor-todo.progress.skipped"),
    progress: "skipped"
  },
] as const;

const progress = computed(() => artifact.progress);

async function handleUpdatedProgress(progress?: string) {
  if (!Progressor.isProgress(progress)) return;
  artifact.updateProgress(progress);
  await services.exchangeArtifact.postFrom(artifact);
}
</script>
<template>
  <div>
    <p>{{ t('editor-todo.progress.update') }}</p>
    <div class="control-progress__buttons">
      <template
        v-for="option in options"
        :key="option.progress"
      >
        <ButtonBase
          :data-test="`button-${option.progress}`"
          :disabled="option.progress === progress"
          :label="option.label"
          severity="secondary"
          @click="handleUpdatedProgress(option.progress)"
        >
          <template #icon>
            <AppIcon :name="option.icon" />
          </template>
        </ButtonBase>
      </template>
    </div>
  </div>
</template>
<style scoped>
.control-progress__buttons {
  display: flex;
  flex-direction: row;
  gap: var(--size-2);
  margin-block-start: var(--size-2)
}
</style>