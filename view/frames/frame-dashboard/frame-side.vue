<script setup>
import { name, version } from "@main/../package.json";
import { useI18n, useTask, SideBar, SideSection, SideItem } from "@lib";
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
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <side-section>
      <side-item :text="name" />
    </side-section>
    <side-section>
      <side-item
        :text="t('page-outline.outline')"
        :active="display.is('page-outline')"
        @click="() => display.pageOutline()"
      />
      <side-item
        :text="t('page-search.search')"
        :active="display.is('page-search')"
        @click="() => display.pageSearch()"
      />
      <side-item
        :text="t('page-preferences.preferences')"
        :active="display.is('page-preferences')"
        @click="() => display.pagePreferences()"
      />
    </side-section>
    <side-section>
      <side-item :text="gate.userEmail" />
      <side-item :text="t('frame-dashboard.sign-out')" @click="signOut.run" />
    </side-section>
    <side-section>
      <side-item :text="`v${version}`" />
    </side-section>
  </side-bar>
</template>
<style scoped></style>
