import {
  onMounted,
  onUnmounted,
  ref
} from "vue";

export function useAutoScroll() {
  const scrollSpeed = 10;
  const scrollThreshold = 50;
  const containerRef = ref<HTMLElement>();
  const scrollIntervalId = ref<number>();
  const isDragging = ref(false);

  function startAutoScroll(direction: "down" | "up", intensity: number) {
    if (scrollIntervalId.value) {
      clearInterval(scrollIntervalId.value);
    }

    if (!containerRef.value) return;

    const scrollContainer = containerRef.value;

    const scrollAcceleration = 1.2;
    const acceleratedSpeed = scrollSpeed * Math.pow(scrollAcceleration, intensity);
    const scrollAmount = direction === "up" ? -acceleratedSpeed : acceleratedSpeed;

    const intervalFor60fps = 16;
    scrollIntervalId.value = window.setInterval(() => {
      scrollContainer.scrollTop += scrollAmount;
    }, intervalFor60fps);
  }

  function stopAutoScroll() {
    if (scrollIntervalId.value) {
      clearInterval(scrollIntervalId.value);
      scrollIntervalId.value = undefined;
    }
  }

  function handleDragOver(event: DragEvent) {
    if (!isDragging.value) return;
    if (!containerRef.value) return;

    const containerRect = containerRef.value.getBoundingClientRect();
    const mouseY = event.clientY;

    const distanceFromTop = mouseY - containerRect.top;
    const distanceFromBottom = containerRect.bottom - mouseY;

    if (distanceFromTop < scrollThreshold) {
      const intensity = (scrollThreshold - distanceFromTop) / scrollThreshold;
      startAutoScroll("up", intensity);
    } else if (distanceFromBottom < scrollThreshold) {
      const intensity = (scrollThreshold - distanceFromBottom) / scrollThreshold;
      startAutoScroll("down", intensity);
    } else {
      stopAutoScroll();
    }
  }

  function handleDragEnter() {
    isDragging.value = true;
  }

  function handleDragLeave(event: DragEvent) {
    if (containerRef.value?.contains(event.relatedTarget as Node)) return;
    isDragging.value = false;
    stopAutoScroll();
  }

  function handleDrop() {
    isDragging.value = false;
    stopAutoScroll();
  }

  function handleDragEnd() {
    isDragging.value = false;
    stopAutoScroll();
  }

  onMounted(() => {
    document.addEventListener("dragend", handleDragEnd);
  });

  onUnmounted(() => {
    stopAutoScroll();
    document.removeEventListener("dragend", handleDragEnd);
  });

  return {
    containerRef,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };
}