<script setup>
import { HeadingText, useT } from "@lib";
import { PageDashboard } from "../page-base";
import ArtifactAdd from "./artifact-add.vue";
import ArtifactsTree from "./artifacts-tree.vue";
// import ProgramsShared from "./programs-shared.vue";

const t = useT();
</script>
<template>
  <page-dashboard>
    <template #title>
      <heading-text>{{ t("artifacts") }}</heading-text>
    </template>
    <template #default>
      <artifact-add />
      <artifacts-tree />
      <!--<programs-shared /> -->
    </template>
  </page-dashboard>
</template>
