<script setup lang="ts">
// import { computed, useAttrs } from "vue";

defineProps({
  active: {
    default: false,
    type: Boolean,
  },
  text: {
    required: true,
    type: String,
  },
});

// const { onClick } = useAttrs();
// const action = computed(() => onClick && !props.active);
// const content = computed(() => !onClick);
</script>
<template>
  <li class="side-item">
    {{ text }}
  </li>
</template>

<style scoped>
/* .side-item {
  padding-block: var(--size-15);
  padding-inline: var(--size-30);
}

.side-item.action {
  cursor: pointer;
}

.side-item.action:hover {
  background-color: var(--color-surface-30);
}

.side-item.content {
  font-weight: var(--font-weight-30);
}

.side-item.active {
  text-decoration: underline;
} */
</style>
