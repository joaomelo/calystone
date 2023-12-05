<script setup>
import { reactive } from "vue";
import { ButtonBase, InputBase, useI18n } from "@lib";
import { useDisplay } from "@view/display";

const props = defineProps({
  term: {
    type: String,
    default: null,
  },
});

const { t } = useI18n();
const display = useDisplay();

const search = reactive({ term: props.term });

const handleClick = () => display.pageSearch(search);
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
