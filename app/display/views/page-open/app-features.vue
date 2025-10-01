<script setup lang="ts">
import { useI18n } from "@/utils";

const { t } = useI18n();
</script>
<template>
  <div class="app-features">
    <i18n-t
      keypath="page-open.features.overview.text"
      scope="global"
      tag="p"
    >
      <a
        data-test="overview-link"
        href="https://github.com/joaomelo/calystone/blob/main/README.md"
        target="_blank"
      >{{ t('page-open.features.overview.link') }}</a>
    </i18n-t>
    <i18n-t
      keypath="page-open.features.privacy.text"
      scope="global"
      tag="p"
    >
      <router-link
        data-test="terms-link"
        :to="{ name: 'terms' }"
      >
        {{ t('page-open.features.privacy.terms') }}
      </router-link>
      <router-link
        data-test="privacy-link"
        :to="{ name: 'privacy' }"
      >
        {{ t('page-open.features.privacy.privacy') }}
      </router-link>
    </i18n-t>
    <i18n-t
      keypath="page-open.features.open-source.text"
      scope="global"
      tag="p"
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