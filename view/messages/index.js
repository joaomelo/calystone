import { pageOutline, pagePreferences, pageSearch, pageSignIn, pageSignUp, pageSolve } from "@view/pages";
import { frameDashboard, frameSign } from "@view/smart";

import { artifact } from "./artifact";
import { sharedActions } from "./shared-actions";
import { tags } from "./tags";

export const messages = {
  artifact,
  "frame-dashboard": frameDashboard,
  "frame-sign": frameSign,
  "page-outline": pageOutline,
  "page-preferences": pagePreferences,
  "page-search": pageSearch,
  "page-sign-in": pageSignIn,
  "page-sign-up": pageSignUp,
  "page-solve": pageSolve,
  "shared-actions": sharedActions,
  tags,
};
