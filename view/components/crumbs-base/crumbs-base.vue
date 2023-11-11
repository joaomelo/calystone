<script setup lang="ts">
import type { Option, Value } from "../shared";
import { hasElements } from "@lib";

type Props = {
  crumbs: Option[];
};
const props = defineProps<Props>();

type Emits = {
  crumb: [name: Value];
};
const emit = defineEmits<Emits>();

const notLast = (i: number) => i < props.crumbs.length - 1;
const handleClick = (crumb: Option) => {
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
  margin-inline: var(--size-00);
}
</style>
