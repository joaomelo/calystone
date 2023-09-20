<script setup>
import { useT } from "@lib";
import { ButtonBase, HeadingText } from "@web/components";
import { PageBase } from "../page-base";

const t = useT();
const handleClick = () => {
  console.log("open");
};
</script>
<template>
  <page-base>
    <template #title>
      <heading-text>{{ t("openFile") }}</heading-text>
    </template>
    <template #default>
      <button-base @click="handleClick">{{ t("openOrNew") }}</button-base>
    </template>
  </page-base>
</template>
