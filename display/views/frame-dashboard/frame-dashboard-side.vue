<script setup lang="ts">
import { useI18n } from "@display/i18n";
import { SideBar, SideItem } from "@lib";

const { t } = useI18n();
</script>
<template>
  <SideBar :active="t('outline')">
    <template #default>
      <SideItem
        :title="t('outline')"
        icon="list-check"
      />
      <SideItem
        icon="tags"
        :title="t('tags')"
      />
      <SideItem
        icon="search"
        :title="t('search')"
      />
      <SideItem
        icon="cog"
        :title="t('preferences')"
      />
    </template>
    <template #bottom>
      <SideItem
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
