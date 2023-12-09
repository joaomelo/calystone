<script setup>
import { name, version } from "@main/../package.json";
import { useI18n, SideBar, SideSection, SideItem } from "@lib";
import { useSignOut } from "./use-sign-out";
import { useEmail } from "./use-email";
import { useOutline } from "./use-outline";

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
defineEmits(["update:modelValue"]);

const { t } = useI18n();
const signOut = useSignOut();
const email = useEmail();
const { isOutline, goOutline } = useOutline();
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
        :active="isOutline()"
        @click="goOutline"
      />
      <!-- <side-item
        :text="t('page-search.search')"
        :active="is('page-search')"
        @click="() => pageSearch()"
      />
      <side-item
        :text="t('page-preferences.preferences')"
        :active="is('page-preferences')"
        @click="() => pagePreferences()"
      /> -->
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
