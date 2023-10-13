export const useCaseList = ["AUTH", "ARTIFACTS_PLAN", "ARTIFACT_EDIT"] as const;
export const initialUseCase: UseCase = "AUTH";
export type UseCase = (typeof useCaseList)[number];

export function isUseCase(value?: string | null): UseCase | null {
  return useCaseList.includes(value as UseCase) ? (value as UseCase) : null;
}
