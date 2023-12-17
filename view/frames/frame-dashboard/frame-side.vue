<script setup>
import { name, version } from "@main/../package.json";
import { useI18n, SideBar, SideSection, SideItem, useDependencies } from "@lib";
import {
  goOutline,
  goPreferences,
  isOutline,
  isPreferences,
  isSearch,
  goSearch,
} from "@view";
import { useSignOut } from "./use-sign-out";
import { useEmail } from "./use-email";

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
defineEmits(["update:modelValue"]);

const dependencies = useDependencies();
const { t } = useI18n();
const signOut = useSignOut();
const email = useEmail();
</script>
<template>
  <side-bar
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <side-section>
      <side-item :text="name" />
    </side-section>
    <side-section>
      <side-item
        :text="t('page-outline.outline')"
        :active="isOutline(dependencies)"
        @click="() => goOutline(dependencies)"
      />
      <side-item
        :text="t('page-search.search')"
        :active="isSearch(dependencies)"
        @click="() => goSearch(dependencies)"
      />
      <side-item
        :text="t('page-preferences.preferences')"
        :active="isPreferences(dependencies)"
        @click="() => goPreferences(dependencies)"
      />
    </side-section>
    <side-section>
      <side-item :text="email" />
      <side-item :text="t('frame-dashboard.sign-out')" @click="signOut.run" />
    </side-section>
    <side-section>
      <side-item :text="`v${version}`" />
    </side-section>
  </side-bar>
</template>
<style scoped></style>
