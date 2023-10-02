import { reactive } from "vue";
import { getParams, setParams } from "./url";

export class UseCases {
  static LOAD_DB = "loadDb";
  static ARTIFACTS_PLAN = "artifactsPlan";
  static ARTIFACT_EDIT = "artifactEdit";

  _initialState = {
    useCase: null,
    context: null,
  };

  _state = reactive({
    useCase: UseCases.LOAD_DB,
    context: null,
  });

  constructor() {
    const [useCase, context] = getParams(["useCase", "context"]);

    if (useCase && useCase !== UseCases.LOAD_DB)
      this._initialState.useCase = useCase;
    if (context) this._initialState.context = context;
  }

  get useCase() {
    return this._state.useCase;
  }

  get context() {
    return this._state.context;
  }

  is(useCase) {
    return this._state.useCase === useCase;
  }

  update(userUseCase, userContext) {
    const useCase = this._initialState.useCase || userUseCase;
    const context = this._initialState.context || userContext;

    this._initialState.useCase = null;
    this._initialState.context = null;

    this._state.useCase = useCase;
    this._state.context = context;

    setParams({ useCase, context });
  }
}
