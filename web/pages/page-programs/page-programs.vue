<script setup>
import { HeadingText, useGlobalStateful } from "../../../lib";
import { PageDashboard } from "../page-base";

import ProgramAdd from "./program-add.vue";
import ProgramsList from "./programs-list.vue";
import ProgramsShared from "./programs-shared.vue";

const pageTitle = useGlobalStateful((i18n) => i18n.t("programs"));
</script>
<template>
  <page-dashboard>
    <template #title>
      <heading-text>{{ pageTitle }}</heading-text>
    </template>
    <template #default>
      <program-add />
      <programs-list />
      <programs-shared />
    </template>
  </page-dashboard>
</template>
