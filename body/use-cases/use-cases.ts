import type { UseCase } from "./use-case";

import { reactive } from "vue";
import { getParams, setParams } from "./url";
import { initialUseCase, isUseCase } from "./use-case";

type UseCaseState = {
  useCase: UseCase;
  context?: Context;
};
type Context = string;

export class UseCases {
  _state: UseCaseState = reactive({
    useCase: "AUTH",
    context: undefined,
  });

  _attemptedState: Partial<UseCaseState> = {
    useCase: undefined,
    context: undefined,
  };

  constructor() {
    const [useCase, context] = getParams(["useCase", "context"]);

    const validatedUseCase = isUseCase(useCase);
    if (!validatedUseCase) return;

    if (validatedUseCase !== initialUseCase)
      this._attemptedState.useCase = validatedUseCase;
    if (context) this._attemptedState.context = context;
  }

  get useCase() {
    return this._state.useCase;
  }

  get context() {
    return this._state.context;
  }

  is(useCase: UseCase) {
    return this._state.useCase === useCase;
  }

  update(userUseCase: UseCase, userContext: Context) {
    const useCase = this._attemptedState.useCase || userUseCase;
    const context = this._attemptedState.context || userContext;

    this._attemptedState.useCase = undefined;
    this._attemptedState.context = undefined;

    this._state.useCase = useCase;
    this._state.context = context;

    setParams({ useCase, context });
  }
}
