computed(getter = (list) => list) {
  return computed(() => getter(this.list()));
}