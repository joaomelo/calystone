<script setup>
import { SideBar, SideItem, SideSection, useDependencies, useI18n } from "@lib";
import { name, version } from "@main/../package.json";
import { goOutline, goPreferences, goSearch, goTags } from "@view";

import { useEmail } from "./use-email";
import { useSignOut } from "./use-sign-out";

defineProps({
  modelValue: {
    required: true,
    type: String,
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
        @click="() => goOutline(dependencies)"
      />
      <side-item
        :text="t('page-search.search')"
        @click="() => goSearch(dependencies)"
      />
      <side-item
        :text="t('tags.tags')"
        @click="() => goTags(dependencies)"
      />
      <side-item
        :text="t('page-preferences.preferences')"
        @click="() => goPreferences(dependencies)"
      />
    </side-section>
    <side-section>
      <side-item :text="email" />
      <side-item
        id="side-sign-out"
        :text="t('frame-dashboard.sign-out')"
        @click="signOut.run"
      />
    </side-section>
    <side-section>
      <side-item :text="`v${version}`" />
    </side-section>
  </side-bar>
</template>
<style scoped></style>
