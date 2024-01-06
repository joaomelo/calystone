<script setup>
import { useI18n } from "@lib";
import { FrameDashboard } from "@view/smart";
import TagsAdd from "./tags-add.vue";
import TagsList from "./tags-list.vue";
import TagsItem from "./tags-item.vue";

const { t } = useI18n();
</script>
<template>
  <frame-dashboard :title="t('page-tags.tags')">
    <tags-add class="frame-dashboard-add" />
    <tags-list>
      <template #item="item">
        <tags-item :id="item.value" />
      </template>
    </tags-list>
  </frame-dashboard>
</template>

<style scoped>
.frame-dashboard-add {
  margin-bottom: var(--size-25);
}
</style>
