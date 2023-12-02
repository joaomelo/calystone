<script setup>
import { name, version } from "@main/../package.json";
import { useI18n, InputBase, useTask, SideBar, SideSection } from "@lib";
import { useBody } from "@body";
import { useDisplay } from "@view/display";

defineProps({ modelValue: { type: String, required: true } });
defineEmits(["update:modelValue"]);

const display = useDisplay();
const { t, i18n } = useI18n();
const { gate } = useBody();

const handleUpdate = (locale) => i18n.updateLocale(locale);

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
      <span>plan</span>
      <span>search</span>
    </side-section>
    <side-section>
      <span class="frame-side-text">{{ gate.userEmail }}</span>
      <span @click="signOut.run">{{ t("frame-dashboard.sign-out") }}</span>
    </side-section>
    <side-section>
      <input-base
        :options="i18n.supported"
        type="select"
        :model-value="i18n.locale"
        @update:model-value="handleUpdate"
      />
      <span>v{{ version }}</span>
    </side-section>
  </side-bar>
</template>
<style scoped>
.frame-side-text {
  font-weight: var(--font-weight-30);
}
</style>
