<script setup>
import { reactive } from "vue";
import { ButtonBase, InputBase, useI18n, useDependencies } from "@lib";
import { goSearch } from "@view";

const props = defineProps({
  term: {
    type: String,
    default: null,
  },
});

const { t } = useI18n();
const dependencies = useDependencies();

const search = reactive({ term: props.term });
const handleClick = () => goSearch(dependencies, search.term);
</script>
<template>
  <div class="search-bar">
    <input-base v-model="search.term" />
    <button-base :label="t('page-search.search')" @click="handleClick" />
  </div>
</template>
<style scoped>
.search-bar {
  display: flex;
  justify-content: space-between;
  gap: var(--size-15);
}
</style>
