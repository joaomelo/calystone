import { dashboardSelectors } from "./dashboard";

export const outlineSelectors = {
  inputName: "#input-name input",
  buttonAdd: "#button-add",
  lisItemContent: ".list-item-content",
  ...dashboardSelectors,
};
