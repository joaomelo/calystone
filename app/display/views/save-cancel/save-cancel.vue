<script setup lang="ts">
import { ButtonBase } from "@/utils";
import { useI18n } from "@/utils/i18n";
import {
  onMounted,
  onUnmounted
} from "vue";

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
    :label="t('cancel')"
    severity="secondary"
    data-test="button-cancel"
    @click="$emit('cancel')"
  />
  <ButtonBase
    :label="t('save')"
    severity="primary"
    data-test="button-save"
    :loading="saving"
    @click="$emit('save')"
  />
</template>