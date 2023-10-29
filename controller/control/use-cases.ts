import { reactive } from "vue";
import { getParams, setParams } from "./url";

type UseCaseState = {
  useCase?: UseCase;
  context?: Context;
};
type Context = string;
type UseCase = string;

export class UseCases {
  _state: UseCaseState = reactive({
    useCase: undefined,
    context: undefined,
  });
  _attemptedState: UseCaseState = {
    useCase: undefined,
    context: undefined,
  };
  _useCases: UseCase[];

  constructor(useCases: UseCase[]) {
    this._useCases = useCases;
    this._state.useCase = useCases[0];

    const [attemptedUseCaseValue, attemptedContext] = getParams([
      "useCase",
      "context",
    ]);

    const attemptedUseCase = asUseCase(this._useCases, attemptedUseCaseValue);
    if (!attemptedUseCase) return;

    if (!isSameUseCase(attemptedUseCase, this._state.useCase))
      this._attemptedState.useCase = attemptedUseCase;
    if (attemptedContext) this._attemptedState.context = attemptedContext;
  }

  get useCase() {
    return this._state.useCase;
  }

  get text() {
    if (!this.useCase) return null;
    return this.useCase.text;
  }

  get context() {
    return this._state.context;
  }

  isCurrent(useCase: UseCase) {
    if (!this.useCase) return false;
    return isSameUseCase(this.useCase, useCase);
  }

  isCurrentSome(...useCases: UseCase[]) {
    return useCases.some((useCase) => this.isCurrent(useCase));
  }

  update(userUseCaseValue: string, userContext?: Context) {
    const userUseCase = asUseCase(this._useCases, userUseCaseValue);
    if (!userUseCase) throw new Error("invalid user case");

    const useCase = this._attemptedState.useCase || userUseCase;
    const context = this._attemptedState.context || userContext;

    this._attemptedState.useCase = undefined;
    this._attemptedState.context = undefined;

    this._state.useCase = useCase;
    this._state.context = context;

    setParams({ useCase: useCase.value, context });
  }
}
