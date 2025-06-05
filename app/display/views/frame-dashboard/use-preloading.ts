import { Store } from "@/display/store";
import { ref } from "vue";

export function usePreloading() {
  const { services } = Store.use();

  const preloading = ref(false);

  services.preloadNodes.subscribe(({ status }) => {
    preloading.value = status === "loading";
  });

  return preloading;
}
