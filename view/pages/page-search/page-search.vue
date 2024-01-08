<script setup>
import { useI18n } from "@lib";
import { FrameDashboard } from "@view/smart";

import SearchBar from "./search-bar.vue";
import SearchItem from "./search-item.vue";
import SearchList from "./search-list.vue";

defineProps({
  term: {
    default: null,
    type: String,
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
