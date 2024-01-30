<script setup>
import { SideBar, SideItem, SideSection, useDependencies, useI18n } from "@lib";
import { name, version } from "@main/../package.json";

import { useEmail } from "./frame-side-email";
import { useSignOut } from "./frame-side-sign-out";

defineProps({
  modelValue: {
    required: true,
    type: String,
  },
});
defineEmits(["update:modelValue"]);

const { helmsman } = useDependencies();
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
        id="side-outline"
        :text="t('shared.outline')"
        @click="() => helmsman.outline()"
      />
      <side-item
        id="side-search"
        :text="t('shared.search')"
        @click="() => helmsman.search()"
      />
      <side-item
        id="side-tags"
        :text="t('shared.tags')"
        @click="() => helmsman.tags()"
      />
      <side-item
        id="side-preferences"
        :text="t('shared.preferences')"
        @click="() => helmsman.preferences()"
      />
    </side-section>
    <side-section>
      <side-item :text="email" />
      <side-item
        id="side-sign-out"
        :text="t('shared.sign-out')"
        @click="signOut"
      />
    </side-section>
    <side-section>
      <side-item :text="`v${version}`" />
    </side-section>
  </side-bar>
</template>
