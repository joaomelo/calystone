<script setup lang="ts">
import {
  onMounted,
  onUnmounted
} from "vue";

import { ButtonBase } from "@/display/affordances/button";
import { useI18n } from "@/display/affordances/i18n";

const props = defineProps<{ saving: boolean }>();
const emit = defineEmits<{
  cancel: []
  save: []
}>();

const { t } = useI18n();

onMounted(() => {
  document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
});

function handleKeyDown(event: KeyboardEvent) {
  if (props.saving) return;
  if (!["Enter", "Escape"].includes(event.key)) return;

  const { target } = event;
  if (!(target instanceof HTMLElement)) return;

  if (target.tagName === "TEXTAREA") return;

  event.preventDefault();
  if (event.key === "Enter") {
    emit("save");
  } else {
    emit("cancel");
  }
};
</script>
<template>
  <ButtonBase
    data-test="button-cancel"
    :label="t('cancel')"
    severity="secondary"
    @click="$emit('cancel')"
  />
  <ButtonBase
    data-test="button-save"
    :label="t('save')"
    :loading="saving"
    severity="primary"
    @click="$emit('save')"
  />
</template>