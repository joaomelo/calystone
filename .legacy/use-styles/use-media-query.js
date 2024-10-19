import { onMounted, onUnmounted, ref } from "vue";

export function useMediaQuery(mediaQueryString) {
  const mediaQuery = window.matchMedia(mediaQueryString);
  const matches = ref(mediaQuery.matches);
  const update = event => (matches.value = event.matches);
  onMounted(() => { mediaQuery.addEventListener("change", update); });
  onUnmounted(() => { mediaQuery.removeEventListener("change", update); });
  return matches;
}
