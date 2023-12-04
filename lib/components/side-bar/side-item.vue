<script setup>
import { computed, useAttrs } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

const { onClick } = useAttrs();
const action = computed(() => onClick && !props.active);
const content = computed(() => !onClick);
</script>
<template>
  <div class="side-item" :class="{ action, content, active }">
    {{ text }}
  </div>
</template>

<style scoped>
.side-item {
  padding-block: var(--size-15);
  padding-inline: var(--size-30);
}

.side-item.action {
  cursor: pointer;
}

.side-item.action:hover {
  background-color: var(--background-color-hover);
}

.side-item.content {
  font-weight: var(--font-weight-30);
}

.side-item.active {
  text-decoration: underline;
}
</style>
