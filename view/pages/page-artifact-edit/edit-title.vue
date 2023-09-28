<script setup>
import { HeadingText, CrumbsBase } from "@view/components";
import { useT } from "@view/i18n";

defineProps({
  name: {
    type: String,
    required: true,
  },
});
defineEmits(["artifacts"]);

const t = useT();

const crumbs = [
  { event: "artifacts", text: t("artifacts") },
  { text: t("edit") },
];
</script>
<template>
  <div>
    <heading-text clipped>{{ name }}</heading-text>
    <crumbs-base
      :crumbs="crumbs"
      class="edit-title-crumbs"
      @crumb="$emit('artifacts')"
    />
  </div>
</template>
<style scoped>
.edit-title-crumbs {
  margin-top: var(--size-10);
}
</style>
