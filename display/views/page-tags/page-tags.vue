<script setup>
import { useI18n } from "@lib";
import { FrameDashboard } from "@view/smart";

import PageTagsAdd from "./page-tags-add.vue";
import PageTagsItem from "./page-tags-item.vue";
import PageTagsItems from "./page-tags-items.vue";

const { t } = useI18n();
</script>
<template>
  <frame-dashboard :title="t('shared.tags')">
    <page-tags-add />
    <page-tags-items>
      <template #item="item">
        <page-tags-item :id="item.value" />
      </template>
    </page-tags-items>
  </frame-dashboard>
</template>
