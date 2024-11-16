export function checkFsaSupport() {
  if (typeof self === "undefined") return false;
  return ("showOpenFilePicker" in self);
}