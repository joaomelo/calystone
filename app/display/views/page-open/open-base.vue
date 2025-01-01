<script setup lang="ts">
import { useI18n } from "@/display/i18n";
import { ButtonBase } from "@/display/widgets";

defineProps<{
  dataTest: string;
  icon: string;
  label: string;
}>();
defineEmits<{
  open: [];
}>();

const { t } = useI18n();
</script>
<template>
  <ButtonBase
    :label="t(label)"
    size="large"
    :data-test="dataTest"
    :icon="icon"
    class="open-base"
    @click="$emit('open')"
  >
    <template #icon>
      <slot name="icon" />
    </template>
  </ButtonBase>
</template>
