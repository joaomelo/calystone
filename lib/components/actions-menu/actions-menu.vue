<script setup>
import { computed, ref } from "vue";
import { ButtonBase } from "@lib";
import { useMenu } from "./use-menu";

const props = defineProps({
  actions: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["action"]);

const isShort = computed(() => props.actions.length <= 1);
const mainAction = computed(() => props.actions[0]);

const actionsToggle = ref();
const actionsDropdown = ref();
const { floatingStyles, toggle } = useMenu(actionsToggle, actionsDropdown);

const handleAction = (value) => {
  emit("action", value);
  toggle();
};
</script>

<template>
  <div>
    <template v-if="isShort">
      <button-base @click="handleAction(mainAction.value)">
        {{ mainAction.text }}
      </button-base>
    </template>
    <template v-else>
      <button-base ref="actionsToggle" label="..." @click="toggle" />
      <div
        ref="actionsDropdown"
        popover
        class="actions-menu-dropdown"
        :style="floatingStyles"
      >
        <div
          v-for="action in actions"
          :key="action.value"
          class="action-menu-dropdown-item"
          @click="handleAction(action.value)"
        >
          {{ action.text }}
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.actions-menu-dropdown {
  margin: 0;
  padding: 0;
  border: var(--border-size-10) solid var(--color-neutral-40);
}

.action-menu-dropdown-item {
  cursor: pointer;
  padding: var(--size-20);
}

.action-menu-dropdown-item:hover {
  background-color: var(--color-neutral-60);
}
</style>
