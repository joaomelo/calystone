<script setup>
import { createId } from "@lib";
import { computed, ref } from "vue";

import { ButtonVeil } from "../button-veil";
import { validateOptionOrOptions } from "../options";
import { PopoverBase } from "../popover-base";
import { VisualIcon } from "../visual-icon";

const props = defineProps({
  actions: {
    default: () => [],
    type: Array,
    validator: validateOptionOrOptions,
  },
  id: {
    default: null,
    type: String,
  },
});

const actionsId = computed(() => props.id || createId());
const toggleId = computed(() => `${actionsId.value}-toggle`);

const show = ref(false);
const handleToggle = () => (show.value = !show.value);
</script>

<template>
  <div
    :id="actionsId"
    class="actions-menu"
  >
    <button-veil
      :id="toggleId"
      @click="handleToggle"
    >
      <visual-icon
        name="more_horiz"
        size="var(--size-30)"
      />
    </button-veil>
    <popover-base
      v-model="show"
      :anchor="toggleId"
      block="end"
      inline="end"
      @click="handleToggle"
    >
      <slot />
    </popover-base>
  </div>
</template>
