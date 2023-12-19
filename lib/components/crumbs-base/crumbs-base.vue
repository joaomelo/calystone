<script setup>
import { computed } from "vue";
import { asOptions, validateOptionOrOptions } from "@lib/components";

const props = defineProps({
  crumbs: {
    type: Array,
    required: true,
    validator: validateOptionOrOptions,
  },
});

const emit = defineEmits(["crumb"]);

const normalizedCrumbs = computed(() => asOptions(props.crumbs));
const notLast = (c) => c < props.crumbs.length - 1;

const handleClick = (crumb) => {
  if (crumb.inactive) return;
  emit("crumb", crumb.value);
};
</script>
<template>
  <div>
    <template v-for="crumb in normalizedCrumbs" :key="crumb.value">
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
