export type UseCase = {
  value: string;
  text: string;
};

export function asUseCase(
  list: UseCase[],
  value?: string | null
): UseCase | null {
  if (!value) return null;

  const useCase = list.find((useCase) => useCase.value === value);
  return useCase ? useCase : null;
}

export function isSameUseCase(
  oneUseCase: UseCase | string,
  anotherUseCase: UseCase | string
) {
  const oneUseCaseValue =
    typeof oneUseCase === "string" ? oneUseCase : oneUseCase.value;
  const anotherUseCaseValue =
    typeof anotherUseCase === "string" ? anotherUseCase : anotherUseCase.value;
  return oneUseCaseValue === anotherUseCaseValue;
}
