<script setup>
import { useI18n } from "@lib";
import { FrameDashboard } from "@view/frames";
import SearchBar from "./search-bar.vue";
import ListMatch from "./list-match.vue";

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
    <search-bar :term="term" class="page-search-bar" />
    <list-match :term="term" />
  </frame-dashboard>
</template>
<style scoped>
.page-search-bar {
  margin-bottom: var(--size-25);
}
</style>
