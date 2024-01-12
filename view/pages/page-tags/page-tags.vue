<script setup>
import { useI18n } from "@lib";
import { FrameDashboard } from "@view/smart";

import TagsAdd from "./tags-add.vue";
import TagsItem from "./tags-item.vue";
import TagsItems from "./tags-items.vue";

const { t } = useI18n();
</script>
<template>
  <frame-dashboard :title="t('tags.tags')">
    <tags-add />
    <tags-items>
      <template #item="item">
        <tags-item :id="item.value" />
      </template>
    </tags-items>
  </frame-dashboard>
</template>
