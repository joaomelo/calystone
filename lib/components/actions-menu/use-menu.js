import { ref } from "vue";
import { useFloating, autoUpdate, offset } from "@floating-ui/vue";

export function useMenu(actionsToggle, actionsDropdown) {
  const { floatingStyles } = useFloating(actionsToggle, actionsDropdown, {
    placement: "bottom",
    whileElementsMounted: autoUpdate,
    middleware: [offset({ mainAxis: 1, crossAxis: -25 })],
  });

  const isShow = ref(false);
  const toggle = () => {
    isShow.value = !isShow.value;
    if (isShow.value) {
      actionsDropdown.value.showPopover();
    } else {
      actionsDropdown.value.hidePopover();
    }
  };

  return { floatingStyles, toggle };
}
