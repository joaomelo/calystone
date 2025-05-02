<script setup lang="ts">
import { useI18n } from "@/utils";

const { t } = useI18n();
</script>
<template>
  <div class="app-features">
    <i18n-t
      keypath="page-open.features.overview.text"
      tag="p"
      scope="global"
    >
      <router-link
        :to="{ name: 'overview' }"
        data-test="overview-link"
      >
        {{ t('page-open.features.overview.link') }}
      </router-link>
    </i18n-t>
    <i18n-t
      keypath="page-open.features.privacy.text"
      tag="p"
      scope="global"
    >
      <router-link
        :to="{ name: 'terms' }"
        data-test="terms-link"
      >
        {{ t('page-open.features.privacy.terms') }}
      </router-link>
      <router-link
        :to="{ name: 'privacy' }"
        data-test="privacy-link"
      >
        {{ t('page-open.features.privacy.privacy') }}
      </router-link>
    </i18n-t>
    <i18n-t
      keypath="page-open.features.open-source.text"
      tag="p"
      scope="global"
    >
      <a
        href="https://github.com/joaomelo/calystone"
        target="_blank"
      >GitHub</a>
    </i18n-t>
  </div>
</template>
<style scoped>
.app-features {
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}
</style>