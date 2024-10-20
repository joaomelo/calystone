export function isDate(maybeDate) {
  return (
    typeof maybeDate?.getTime === "function" && !isNaN(maybeDate.getTime())
  );
}
