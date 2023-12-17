import { useI18n } from "@lib";

export function useActions() {
  const { t } = useI18n();

  const appendAction = { value: "append", text: t("page-outline.append") };
  const delAction = { value: "del", text: t("page-outline.delete") };
  const editAction = { value: "edit", text: t("page-outline.edit") };
  const focusAction = { value: "focus", text: t("page-outline.focus") };

  const actions = [editAction, appendAction, focusAction, delAction];

  return { actions, editAction, appendAction, focusAction, delAction };
}
