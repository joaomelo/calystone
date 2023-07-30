<script setup>
import { computed, ref } from "vue";
import { useFloating, autoUpdate, offset } from "@floating-ui/vue";
import { ButtonBase } from "../button-base";

const props = defineProps({
  actions: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["action"]);

const isShort = computed(() => props.actions.length <= 1);
const mainAction = computed(() => props.actions[0]);

const handleAction = (name) => emit("action", name);

const isShow = ref(false);
const actionsMenuToggle = ref(null);
const actionsMenuDropdown = ref(null);
const { floatingStyles } = useFloating(actionsMenuToggle, actionsMenuDropdown, {
  placement: "bottom",
  whileElementsMounted: autoUpdate,
  middleware: [offset({ mainAxis: 1, crossAxis: -25 })],
});
const showMenu = () => {
  if (isShow.value) {
    actionsMenuDropdown.value.hidePopover();
  } else {
    actionsMenuDropdown.value.showPopover();
  }
  isShow.value = !isShow.value;
};
</script>

<template>
  <div>
    <template v-if="isShort">
      <button-base @click="handleAction(mainAction.name)">
        {{ mainAction.label }}
      </button-base>
    </template>
    <template v-else>
      <button-base @click="showMenu" ref="actionsMenuToggle">...</button-base>
      <div
        popover
        ref="actionsMenuDropdown"
        class="actions-menu-dropdown"
        :style="floatingStyles"
      >
        <div
          v-for="action in actions"
          :key="action.name"
          class="action-menu-dropdown-item"
          @click="handleAction(action.name)"
        >
          {{ action.label }}
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
  padding: var(--size-10);
}

.action-menu-dropdown-item:hover {
  background-color: var(--color-neutral-60);
}
</style>
