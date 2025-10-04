import { ref } from "vue";

import { Store } from "@/display/store";

export function usePreloading() {
  const { services } = Store.use();

  const preloading = ref(false);

  services.preloadNodes.subscribe(({ status }) => {
    preloading.value = status === "loading";
  });

  return preloading;
}
