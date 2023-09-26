<script setup>
import { HeadingText } from "@view/components";
import { useT } from "@view/i18n";

defineProps({
  name: {
    type: String,
    required: true,
  },
});
defineEmits(["artifacts"]);

const t = useT();
</script>
<template>
  <div>
    <heading-text clipped>{{ name }}</heading-text>
    <div>
      <span class="edit-title-crumbs" @click="$emit('artifacts')">
        {{ t("artifacts") }}
      </span>
      <span class="divider">\</span>
      <span>edit</span>
    </div>
  </div>
</template>
<style scoped>
.edit-title-crumbs {
  margin-top: var(--size-10);
  text-decoration: underline;
  cursor: pointer;
}

.divider {
  margin-inline: var(--size-00);
}
</style>
