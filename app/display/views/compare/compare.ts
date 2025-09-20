import type { TodoArtifact } from "@/domain";
import type { ServicesPortfolio } from "@/services";

export function createCompare({
  criterion,
  services
}: {
  criterion?: string
  services: ServicesPortfolio;
}) {
  const compareNumeric = typeof criterion === "string"
    ? createCompareByCriterion(criterion)
    : compareByPriority;
  const compareByPath = createCompareByPath(services);

  return (a: TodoArtifact, b: TodoArtifact): number => {
    const result = compareNumeric(a, b);
    if (result !== 0) return result;
    return compareByPath(a, b);
  };
}

function compareByPriority(a: TodoArtifact, b: TodoArtifact): number {
  return b.priority() - a.priority();
}

function createCompareByCriterion(criterion: string) {
  return (a: TodoArtifact, b: TodoArtifact): number => {
    const aCriterion = a.hasCriterion(criterion)
      ? a.criterion(criterion)
      : { value: 0 } ;
    const aCriterionValue = aCriterion.value;

    const bCriterion = b.hasCriterion(criterion)
      ? b.criterion(criterion)
      : { value: 0 };
    const bCriterionValue = bCriterion.value;

    return bCriterionValue - aCriterionValue;
  };
}

function createCompareByPath(services: ServicesPortfolio) {
  return (a: TodoArtifact, b: TodoArtifact): number => {
    const aPath = services.queryHierarchy.path(a);
    const bPath = services.queryHierarchy.path(b);
    return aPath.localeCompare(bPath);
  };
}