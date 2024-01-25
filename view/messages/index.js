import { pageOpen, pageSignIn, pageSignUp, pageSolve } from "@view/pages";
// import { frameDashboard, frameSign } from "@view/smart";

import { actions } from "./actions";
import { artifacts } from "./artifacts";
import { tags } from "./tags";

export const messages = {
  // "frame-dashboard": frameDashboard,
  // "frame-sign": frameSign,
  // "page-outline": pageOutline,
  // "page-preferences": pagePreferences,
  // "page-search": pageSearch,

  actions,
  artifacts,
  "page-open": pageOpen,
  "page-sign-in": pageSignIn,
  "page-sign-up": pageSignUp,
  "page-solve": pageSolve,
  tags,
};
