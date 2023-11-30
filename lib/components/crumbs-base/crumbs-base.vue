<script setup>
import { hasElements } from "@lib";

const props = defineProps({
  crumbs: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["crumb"]);

const notLast = (c) => c < props.crumbs.length - 1;
const handleClick = (crumb) => {
  if (crumb.inactive) return;
  emit("crumb", crumb.value);
};
</script>
<template>
  <div v-if="hasElements(crumbs)">
    <template v-for="(crumb, index) in crumbs" :key="index">
      <span
        class="crumbs-base-crumb"
        :class="{ clickable: !crumb.inactive }"
        @click="handleClick(crumb)"
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
  margin-inline: var(--size-15);
}
</style>
