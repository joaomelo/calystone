<script setup lang="ts">
import { useI18n } from "@display/i18n";
import { ACTIVITIES, type Activity, isActivity } from "@domain";
import { SideBar, SideItem } from "@lib";

defineProps<{
  active: Activity
}>();
const emit = defineEmits<{
  "update:active": [active: Activity]
}>();
const { t } = useI18n();

function handleUpdateActive(active: string) {
  if (isActivity(active)) emit("update:active", active);
}
</script>
<template>
  <SideBar
    :active="active"
    @update:active="handleUpdateActive"
  >
    <template #default>
      <SideItem
        :id="ACTIVITIES.OUTLINE"
        :title="t(ACTIVITIES.OUTLINE)"
        icon="list-check"
      />
      <SideItem
        :id="ACTIVITIES.TAGS"
        icon="tags"
        :title="t(ACTIVITIES.TAGS)"
      />
      <SideItem
        :id="ACTIVITIES.SEARCH"
        icon="search"
        :title="t(ACTIVITIES.SEARCH)"
      />
      <SideItem
        :id="ACTIVITIES.PREFERENCES"
        icon="cog"
        :title="t(ACTIVITIES.PREFERENCES)"
      />
    </template>
    <template #bottom>
      <SideItem
        :id="ACTIVITIES.OPEN"
        icon="sign-out"
        :title="t('exit')"
      />
    </template>
  </SideBar>

<!-- <side-bar
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
  </side-bar> -->
</template>
