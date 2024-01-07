<script setup>
import { FrameDashboard } from "@view/smart";
import { useI18n } from "@lib";

import SearchBar from "./search-bar.vue";
import SearchItem from "./search-item.vue";
import SearchList from "./search-list.vue";

defineProps({
  term: {
    type: String,
    default: null,
  },
});

const { t } = useI18n();
</script>
<template>
  <frame-dashboard :title="t('page-search.search')">
    <search-bar :term="term" />
    <search-list :term="term">
      <template #item="item">
        <search-item :id="item.value" />
      </template>
    </search-list>
  </frame-dashboard>
</template>
