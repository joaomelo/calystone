<script setup>
import { name } from "@main/../package.json";
import {
  useI18n,
  useTask,
  SideBar,
  SideSection,
  SideAction,
  SideText,
} from "@lib";
import { useBody } from "@body";
import { useDisplay } from "@view/display";

defineProps({ modelValue: { type: String, required: true } });
defineEmits(["update:modelValue"]);

const display = useDisplay();
const { t } = useI18n();
const { gate } = useBody();

const signOut = useTask(async () => {
  await gate.signOut();
  display.pageAuth();
});
</script>
<template>
  <side-bar
    :title="name"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <side-section>
      <side-action
        :text="t('page-outline.outline')"
        @click="() => display.pageOutline()"
      />
      <side-action
        :text="t('page-search.search')"
        @click="() => display.pageSearch()"
      />
      <side-action
        :text="t('page-preferences.preferences')"
        @click="() => display.pagePreferences()"
      />
    </side-section>
    <side-section>
      <side-text :text="gate.userEmail" />
      <side-action :text="t('frame-dashboard.sign-out')" @click="signOut.run" />
    </side-section>
  </side-bar>
</template>
<style scoped></style>
