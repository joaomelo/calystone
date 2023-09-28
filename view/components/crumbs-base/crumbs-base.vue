<script setup>
import { hasElements } from "@shared";

const props = defineProps({
  crumbs: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["crumb"]);

const notLast = (i) => i < props.crumbs.length - 1;
const isClickable = (crumb) => !!crumb.event;

const handleClick = (crumb) => {
  if (!isClickable) return;
  emit("crumb", crumb.event);
};
</script>
<template>
  <div v-if="hasElements(crumbs)">
    <template v-for="(crumb, index) in crumbs" :key="index">
      <span
        class="crumbs-base-crumb"
        :class="{ clickable: isClickable(crumb) }"
        @click="handleClick"
      >
        {{ crumb.text }}
      </span>
      <span v-if="notLast(index)" class="crumbs-base-divider">\</span>
    </template>
  </div>
</template>
<style scoped>
.crumbs-base-crumb.clickable {
  text-decoration: underline;
  cursor: pointer;
}

.crumbs-base-divider {
  margin-inline: var(--size-00);
}
</style>
