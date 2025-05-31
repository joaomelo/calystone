<script setup lang="ts">
import { ButtonBase } from "@/utils";
import { useI18n } from "@/utils/i18n";

defineProps<{
  saving: boolean
}>();
defineEmits<{
  cancel: []
  save: []
}>();

const { t } = useI18n();
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