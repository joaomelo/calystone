<script setup>
import { inject, watch } from "vue";
import { useRouter } from "vue-router";
import { AUTH_STATUSES } from "../../../body";
import { useStateful } from "../../helpers";
import { OverlayBase } from "../../components";
import { PAGE_VISIBILITY } from "./visibilities";

const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  busy: {
    type: Boolean,
    default: false,
  },
  visibility: {
    type: String,
    default: PAGE_VISIBILITY.PUBLIC,
  },
});

const router = useRouter();
const { auth } = inject("globals");
const authStatus = useStateful(auth, (a) => a.status);

watch(
  [() => props.visibility, () => authStatus.value],
  ([visibility, status]) => {
    if (visibility === PAGE_VISIBILITY.PUBLIC) return;

    if (
      visibility === PAGE_VISIBILITY.INTERNAL &&
      status !== AUTH_STATUSES.SIGNED_IN
    )
      return router.push("/");

    if (
      visibility === PAGE_VISIBILITY.EXTERNAL &&
      status !== AUTH_STATUSES.SIGNED_OUT
    )
      return router.push("/");
  },
  {
    immediate: true,
  }
);

const { i18n } = inject("globals");
const locale = i18n.map((i18n) => i18n.locale);
</script>
<template>
  <div class="page-base">
    <nav class="page-base-nav">
      <h1 class="page-base-title">{{ title }}</h1>
      <slot name="aside"></slot>
    </nav>
    <overlay-base :show="busy" class="page-base-content-overlay">
      <div class="page-base-content">
        <slot></slot>
      </div>
    </overlay-base>
    <footer class="page-base-footer">calystone - {{ locale }}</footer>
  </div>
</template>
<style scoped>
.page-base {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.page-base-nav {
  margin-block-end: var(--size-30);
  display: flex;
  justify-content: space-between;
}

.page-base-title {
  font-size: var(--font-size-30);
  font-weight: var(--font-weight-30);
}

.page-base-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--size-20);
}

.page-base-content-overlay {
  width: 100%;
  height: 100%;
}

.page-base-footer {
  text-align: center;
  color: var(--color-neutral-30);
  font-size: var(--font-size-10);
}
</style>
