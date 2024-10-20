<script setup>
import { ButtonBase, FormBase, InputText, useDependencies, useI18n } from "@/lib";
import { goSearch } from "@/view";
import { reactive } from "vue";

const props = defineProps({
  term: {
    default: null,
    type: String,
  },
});

const { t } = useI18n();
const dependencies = useDependencies();

const search = reactive({ term: props.term });
const handleSearch = () => goSearch(dependencies, search.term);
</script>
<template>
  <form-base
    inline
    @submit="handleSearch"
  >
    <template #default>
      <input-text
        id="input-search"
        v-model="search.term"
        autofocus
      />
    </template>
    <template #buttons>
      <button-base
        :label="t('shared.search')"
        type="submit"
      />
    </template>
  </form-base>
</template>
