<script setup>
import {
  InputSelect,
  useI18n
} from "@/utils";

const { t } = useI18n();

</script>
<template>
  <InputSelect
    :label="t('common.criterion')"
    data-test="select-criterion"
    :options="[]"
  />
</template>