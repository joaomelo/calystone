<script setup>
import { computed, ref } from "vue";
import { createId } from "@lib";
import { ButtonBase } from "../button-base";
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
const emit = defineEmits(["action"]);

const isShort = computed(() => props.actions.length <= 1);
const mainAction = computed(() => props.actions[0]);

const actionsId = computed(() => props.id || createId());
const toggleId = computed(() => `${actionsId.value}-toggle`);

const handleAction = (value) => {
  emit("action", value);
  if (!isShort.value) handleToggle();
};

const show = ref(false);
const handleToggle = () => {
  show.value = !show.value;
};
</script>

<template>
  <div :id="actionsId" class="actions-menu">
    <template v-if="isShort">
      <button-base
        :label="mainAction.text"
        @click="handleAction(mainAction.value)"
      />
    </template>
    <template v-else>
      <button-base :id="toggleId" label="..." @click="handleToggle" />
      <popover-base v-model="show" :anchor="toggleId" block="end" inline="end">
        <div
          v-for="action in actions"
          :key="action.value"
          class="action-menu-item"
          :class="[action.value]"
          @click="handleAction(action.value)"
        >
          {{ action.text }}
        </div>
      </popover-base>
    </template>
  </div>
</template>

<style scoped>
.action-menu-item {
  cursor: pointer;
  padding: var(--size-20);
}

.action-menu-item:hover {
  background-color: var(--background-color-highlight);
}
</style>
