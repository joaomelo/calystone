<script setup>
import { reactive } from "vue";
import {
  ButtonBase,
  FormBase,
  InputText,
  useDependencies,
  useI18n,
} from "@lib";
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
        :label="t('page-search.search')"
        type="submit"
      />
    </template>
  </form-base>
</template>
