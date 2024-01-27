import { pageOpen, pageSignIn, pageSignUp, pageSolve } from "@view/pages";

import { actions } from "./actions";
import { artifacts } from "./artifacts";
import { auth } from "./auth";
import { tags } from "./tags";

export const messages = {
  actions,
  artifacts,
  auth,
  "page-open": pageOpen,
  "page-sign-in": pageSignIn,
  "page-sign-up": pageSignUp,
  "page-solve": pageSolve,
  tags,
};
