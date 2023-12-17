import { useI18n, useDependencies } from "@lib";
import { getArtifact } from "@body";

export function useTitle(parentId) {
  const { t } = useI18n();

  if (!parentId) return t("page-outline.outline");

  const dependencies = useDependencies();
  const { name } = getArtifact(dependencies, parentId);
  return name;
}
