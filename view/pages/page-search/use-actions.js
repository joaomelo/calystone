import { useI18n } from "@lib";

export function useActions() {
  const { t } = useI18n();
  const editAction = { value: "edit", text: t("page-search.edit") };
  const focusAction = { value: "focus", text: t("page-search.focus") };
  const actions = [editAction, focusAction];
  return { actions, editAction, focusAction };
}
