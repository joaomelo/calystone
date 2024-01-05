<script setup>
import { computed, ref } from "vue";
import { createId } from "@lib";
import { ButtonVeil } from "../button-veil";
import { VisualIcon } from "../visual-icon";
import { PopoverBase } from "../popover-base";
import { validateOptionOrOptions } from "../options";

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
  actions: {
    type: Array,
    default: () => [],
    validator: validateOptionOrOptions,
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
